import React from 'react';
import '../css/register.css';
import { Link } from 'react-router-dom';
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
            this.setState({isWrongInput: true, wrongText: "Некорректный ввод"});
            return;
        }
        
        var repPassword = document.getElementById("password-repeat");

        if (document.getElementById("password").value != repPassword.value){
            repPassword.classList.add("wrong-input");
            this.setState({isWrongInput: true, wrongText: "Пароли не совпадают"});  
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
                This.setState({isWrongInput: true, wrongText: "Почта уже используется"});

            } else if (res.isLogin) {
                document.getElementById("login").classList.add("wrong-input");
                This.setState({isWrongInput: true, wrongText: "Логин уже используется"});
            }
        });
    }

    render() { 	
	  return (
        <div className="container">
            {(() => {if (this.state.isWrongInput) return <div className="invalid">{this.state.wrongText}</div>;})()}
            <form id="insert" name="insert">
            
                <h1>Регистрация</h1>
                <p>Пожалуйста заполните форму для регистрации.</p>
                <hr/>

                <label>
                    <b>Почта</b>
                    <div className="input-border">
                        <input type="text" id="email" placeholder="Enter Email" name="email" required/>
                    </div>
                </label>

                <label>
                    <b>Логин</b>
                    <div className="input-border">
                        <input type="text" id="login" placeholder="Enter Login" name="login" required/>
                    </div>
                </label>

                <label>
                    <b>Пароль</b>
                    <div className="input-border">
                        <input type="password" id="password" placeholder="Enter Password" name="password" required/>
                    </div>
                </label>

                <label>
                    <b>Повторите пароль</b>
                    <div className="input-border">
                        <input type="password" id="password-repeat" placeholder="Repeat Password" name="psw-repeat" required/>
                    </div>
                </label>
                
            </form>

            <input type="submit" className="registerbtn" value="Регистрация" onClick={this.saveInsert}/>    
        </div>
      );
  }
}; 

export default Register;