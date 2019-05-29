import React from 'react';
import '../css/register.css';
import { Link } from 'react-router-dom';
//import validationInput from '../common/common';
import { validationInputForBorder as validationInput } from '../common/common';

import '../css/wrong.css';
import '../css/input.css';

class Register extends React.Component { 

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
        
        var repPassword = document.getElementById("password-repeat");

        if (document.getElementById("password").value != repPassword.value){
            repPassword.classList.add("wrong-input");
            this.setState({isWrongInput: true, wrongText: "wrong repeat"});  
            return;
        }
        
        this.setState({isWrongInput: false});

        var formData = new FormData(document.forms["insert"]);

        var This = this;

        fetch("/insertUser", {
            method: "POST",
            body: formData
        }).then((res) => res.json())
        .then(function(res){
            if (res.isRegister) {
                window.location.href = "/topics";
            } else if (res.isEmail) {

                document.getElementById("email").classList.add("wrong-input");
                This.setState({isWrongInput: true, wrongText: "email use"});

            } else if (res.isLogin) {

                document.getElementById("login").classList.add("wrong-input");
                This.setState({isWrongInput: true, wrongText: "login use"});

            }
        });
    }

    render() { 	
	  return (
        <div className="container">
            {(() => {if (this.state.isWrongInput) return <div className="invalid">{this.state.wrongText}</div>;})()}
            <form id="insert" name="insert">
            
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>

                <label>
                    <b>Email</b>
                    <div className="input-border">
                        <input type="text" id="email" placeholder="Enter Email" name="email" required/>
                    </div>
                </label>

                <label>
                    <b>Login</b>
                    <div className="input-border">
                        <input type="text" id="login" placeholder="Enter Login" name="login" required/>
                    </div>
                </label>

                <label>
                    <b>Password</b>
                    <div className="input-border">
                        <input type="password" id="password" placeholder="Enter Password" name="password" required/>
                    </div>
                </label>

                <label>
                    <b>Repeat Password</b>
                    <div className="input-border">
                        <input type="password" id="password-repeat" placeholder="Repeat Password" name="psw-repeat" required/>
                    </div>
                </label>
                
            </form>

            <input type="submit" className="registerbtn" value="Register" onClick={this.saveInsert}/>    
        </div>
      );
  }
}; 

export default Register;