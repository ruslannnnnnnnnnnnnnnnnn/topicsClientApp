import React from 'react';
import '../css/topic.css';
import { Link } from 'react-router-dom';
import InsertTopic from '../components/InsertTopic';
import ModalWindow from '../components/ModalWindow';

class BigTopic extends React.Component { 

    constructor(props) {
        super(props);		
        this.state = {
            topic: {title: "", text: "", _id: this.props.match.params.topic.toString(), createrLogin: ""},
            isLoad: true,
            isUpdate: false,
            isRemove: false,
            isCreater: false
        };

        this.onUpdate = this.onUpdate.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onYesClickModal = this.onYesClickModal.bind(this);   
        this.topic = this.topic.bind(this);

        this.formDate = new FormData();
        this.formDate.append("_id", this.props.match.params.topic.toString());
    }

    topic() {
        var thisTopic = this;   
 
        this.setState({_id: "", isLoad: true, isUpdate: false});
        
        fetch("/find", {
            method: "POST",
            body: this.formDate
        }).then((res) => res.json())
        .then((topic) => thisTopic.setState({topic: topic, isLoad: false}));
    }

    onUpdate() {
        this.setState({isUpdate: !this.state.isUpdate});
    }

    onRemove() {
        window.location.href = "#modal-winodw";
    }

    onYesClickModal() {
        var thisTopic = this;   

        this.setState({isLoad: true, isUpdate: false});

        fetch("/removeTopic", {
            method: "POST",
            body: this.formDate
        }).then(function(){
            thisTopic.setState({isLoad: false});
            window.location.href = "/topics";
        });
    }

    render() { 	
        var text = this.state.topic.text;
        
        if (this.state.isLoad) {
            return (<div>loading...</div>);
        } 

        if (this.state.isCreater) {
            var isAuthButons = (                    
                <div className="buttons-topic">
                    <input type="submit" value="обновить топик" onClick={this.onUpdate}/>
                    <input type="submit" value="удалить топик" onClick={this.onRemove}/>
                </div>
            );
        }

        if (!this.state.isUpdate) {
            return (
                <div>
                    <Link to="/topics" className="title-link">К темам</Link>
                    <div className="big-topic">
                        <div className="create-topic">
                            creater:
                            <Link to={"/profil/" + this.state.topic.createrLogin} className="creater-link">{this.state.topic.createrLogin}</Link>
                        </div>
                        <h2>{this.state.topic.title}</h2>                        
                        <div className="topic-text">
                            <div className={this.state.class}>{text}</div>
                        </div>                     
                    </div>
                    {isAuthButons}
                    <ModalWindow onYesClickModal={this.onYesClickModal}/>
                </div>
            );
        } else {
            return (
                <div>
                    <InsertTopic topic={this.state.topic} onInsertUpdate={this.topic}/>
                    <input type="submit" value="К топику" onClick={this.onUpdate}/>
                </div>
            );
        }
    } 

    componentDidMount() {
        this.topic();

        fetch("/isCreaterTopic", {
            method: "POST", 
            body: this.formDate
        })
        .then((res) => res.json())
        .then(((res) => this.setState({isCreater: res.isCreater})).bind(this));
    }
}; 

export default BigTopic;