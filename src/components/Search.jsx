import React from 'react';
import '../css/search.css';

class Search extends React.Component { 

    constructor(props){
        super(props);		
        this.click = this.click.bind(this);
        this.setOption = this.props.setOption;
        this.callBack = this.props.callBack;
        this.url = this.props.url;
        this.toks = [];
        this.isToks = true;
        this.isClick = true;

        this.state = {};
        this.props.back.search = this.click;

        this.props.back.setCheckboxs = ((boxs) => {
            this.checkboxs = boxs;
            this.setState({});
        }).bind(this);

        this.checkboxs = this.props.checkboxs;

    }
  
    click(option, callBack) {
        if (option == null)  option = this.setOption();

        var textSearch = document.getElementById("text-search").value;
        var thisTopic = this;
        
        console.log({textSearch, isToks: this.isToks, isClick: this.isClick});

        if (textSearch != "" && this.isToks && this.isClick) {
            this.toks = textSearch.split(/ +/);      
            this.isToks = false;
            this.isClick = false;
        } else if (textSearch == "" && this.isToks && this.isClick) {
            this.toks = [];
            this.isToks = false;
            this.isClick = false;
        }

        this.toks.forEach((item, i) => option.body.append("tok-" + i, item));
    
        fetch(this.url, option)
        .then((res) => res.json())
        .then(((resul) => callBack(resul, this.toks)).bind(this));       
    }

    render() { 	
        var This = this;
	  return (
        <div className="topnav">
            <input id="text-search" type="text" placeholder="Search.." onChange={() => This.isToks = true}/>
            <input id="search-button" type="submit" value="Search" onClick={() => {This.isClick = true; This.click(null, This.callBack);}}/>
            {this.checkboxs.map(function(item, i) {
                return  (<div className="checkbox" key={"checkbox" + i}>
                            <input type="checkbox" id={"searchCheckbox" + i} checked={item.default} onChange={() => { 
                                    This.isToks = true;
                                    This.isClick = true;                                    
                                    item.onChange(window["searchCheckbox" + i], This); 
                                    This.checkboxs[i].default = !This.checkboxs[i].default;
                                    This.setState({});
                                }
                            }/>{item.text}
                        </div>);
            })}          
        </div>
      );
    }
}; 

export default Search;