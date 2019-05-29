import React from 'react';
import '../css/side.css';
import { Link } from 'react-router-dom';
import '../css/topic.css';
import { validationInputForBorder as validationInput } from '../common/common';

import '../css/wrong.css';
import '../css/input.css';
//import Input from '../components/Input';

class InsertTopic extends React.Component { 

	constructor(props){
		super(props);		
        this.saveInsert = this.saveInsert.bind(this);

        this.state = {isWrongInput: false};

        if (this.props.topic != null) {
            this.title = this.props.topic.title;
            this.text  = this.props.topic.text;
            this._id = this.props.topic._id;
            this.insertUpdate = "update";
        } else {
            this.title = this.text = "";
            this.insertUpdate = "insert";
        }
    }
    
    saveInsert(){
        if (!validationInput("wrong-input")) 
        {
            this.setState({isWrongInput: true});
            return;
        }
        
        this.setState({isWrongInput: false});

        var formData = new FormData(document.forms["insert-topic"]);

        if (this.insertUpdate == "update") formData.append("_id", this._id);

        var This = this;

        fetch("/" + this.insertUpdate + "Topic", {
            method: "POST",
            body: formData
        }).then(function(){
            if (This.props.onInsertUpdate != null) {
                This.props.onInsertUpdate(This);
            }
            else window.location.href = "/topics";
        });
    }

  render() { 
    
	  return (
        <div>
            <Link to="/topics" className="title-link">Topics</Link>
            <div className="container insert">            
                {(() => {if (this.state.isWrongInput) return <div className="invalid">Invalid input</div>;})()}
                <form id="insert-topic" name="insert-topic">         
                        <label>
                            insert title
                            <div className="input-border">
                                <input id="insert-title" name="title" placeholder="write title.." type="text" defaultValue={this.title} pattern="\w{1,120}" required/>
                            </div>
                        </label>
                        <label>
                            insert text
                            <div className="input-border">
                                <textarea id="insert-text" name="text" placeholder="write text.." defaultValue={this.text} required/>
                            </div>
                        </label>              
                </form>
                <input type="submit" value={this.insertUpdate} onClick={this.saveInsert}/>
            </div>
        </div>
    );
  }
}; 

export default InsertTopic;