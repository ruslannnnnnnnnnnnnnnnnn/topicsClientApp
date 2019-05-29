import React from 'react';
import '../css/side.css';
import { Link } from 'react-router-dom';

class Side extends React.Component { 

	constructor(props){
		super(props);
		this.open = "190px";
		this.close = "30px";		
		this.state = {isOpen: false, style: {width: this.open}, class: "left", heightStyle: ""};
		this.openClose = this.openClose.bind(this);		
		this.resize = this.resize.bind(this);
		this.props.hendlers.resize = this.resize;
	}

	openClose(){
		var style = Object.assign({}, this.state.style);

		if (this.state.isOpen) {
			document.getElementById(this.props.main).style.marginLeft = this.close;
			style.width = this.close;
			this.setState({isOpen: false, style: style, class: "right"});
		} else {
			document.getElementById(this.props.main).style.marginLeft = this.open;
			style.width = this.open;
			this.setState({isOpen: true, style: style, class: "left"});
		}
	}

  	render() { 	
		return(
			<div className="sidenavig-top" style={Object.assign({height: this.state.heightStyle}, this.state.style)} onClick={this.openClose}>
				<div id="sidenavig" style={this.state.style} className="sidenavig">
					{this.props.items.map(function(elem, index){
						return (
							<li key={elem.value + "-" + index}>
								<Link className="navig-link" to={elem.to}>{elem.value}</Link>
							</li>
						);
					})}
					<div className={"arrow " + this.state.class}>
						<div className="bar3"></div>
						<div className="bar1"></div>
					</div>
				</div>
			</div>
		);
	}

	resize(defult){
		if (defult) {
			this.setState({heightStyle: ""});
			return;
		}
		var height = document.getElementById(this.props.main).offsetHeight;
		if (height < document.getElementById("sidenavig").clientHeight) return;
		this.setState({heightStyle: height + "px"});
	}

	componentDidMount(){
		this.openClose();
	}
}; 

export default Side;
