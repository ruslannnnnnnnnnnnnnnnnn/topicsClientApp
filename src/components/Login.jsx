import React from 'react';
import '../css/register.css';
import { Link } from 'react-router-dom';
import { validationInputForBorder as validationInput } from '../common/common';

import '../css/wrong.css';
import '../css/input.css';

class Login extends React.Component { 

    constructor(props){
		super(props);		
        this.saveInsert = this.saveInsert.bind(this);
        this.state = {isWrongInput: false, wrongText: ""};
    }

    saveInsert(){
        if (!validationInput("wrong-input")) {
            this.setState({isWrongInput: true, wrongText: "wrong input"});
            return;
        }
        
        this.setState({isWrongInput: false});

        var formData = new FormData(document.forms["insert"]);
        var This = this;

        fetch("/login", {
            method: "POST",
            body: formData
        }).then((res) => res.json())
        .then(function(res){
            if (res.isRegister) {
                fetch("/isLogin", {method: "POST"});
                window.location.href = "/topics";
                if (typeof This.props.onAuth == "function") {
                    This.props.onAuth();
                }
            } else if (res.wrong) {
                This.setState({isWrongInput: true, wrongText: "error input"});
            } 
        });
    }

    render() { 	
	    return (
            <div className="container">
                {(() => {if (this.state.isWrongInput) return <div className="invalid">{this.state.wrongText}</div>;})()}
                <form id="insert" name="insert">
                    <label>
                        <b>Почта</b>
                        <div className="input-border">
                            <input type="text" id="email" placeholder="Enter Email" name="email" required/>
                        </div>
                    </label>

                    <label>
                        <b>Пароль</b>
                        <div className="input-border">
                            <input type="password" id="password" placeholder="Enter Password" name="password" required/>
                        </div>
                    </label>
                    <hr/>     
                </form>

                <input type="submit" className="registerbtn" value="Войти" onClick={this.saveInsert}/>     
            </div>
        );
    }
}; 

export default Login;