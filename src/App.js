import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Side from './components/Side';
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import BigTopic from './components/BigTopic';
import Topics from './components/Topics';
import InsertTopic from './components/InsertTopic';
import Register from './components/Register';
import Login from './components/Login';
import Profil from './components/Profil';
import { Link } from 'react-router-dom';

class App extends Component {

    constructor(props){
		super(props);		
        this.state = {};
        this.authState = {isAuth: false, isLoading: false, isTrainAuth: false};
        this.isAuth = this.isAuth.bind(this);
        this.setAuthState = this.setAuthState.bind(this);

        this.items = {
            auth: [{ to: "/profil", value: "Профиль" }, { to: "/insert-topic", value: "Создать топик" }, { to: "/logout", value: "Выйти" }],
            noAuth: [{ to: "/register", value: "Регистрация" }, { to: "/login-user", value: "Войти" }]
        };

        this.additionItem = this.items.noAuth;

        var This = this;

        fetch("/isAuthenticated").then((res) => res.json())
        .then((res) => {if (res.isAuth) This.setAdditionItem(This.items.auth);});

        this.hendlers = {resize: () => {}};
    }

    isAuth(isAuthReactComp, noAuthReactComp) {
        if (this.authState.isAuth) {
            this.authState = {isAuth: false, isLoading: false, isTrainAuth: false};
            this.additionItem = this.items.auth;
            return (isAuthReactComp);
        } 
        if (this.authState.isLoading) {
            return (<div>Loading..</div>);
        }

        var This = this;

        if (!this.authState.isTrainAuth) {
            this.setAuthState({isLoading: true, isTrainAuth: true, isAuth: this.authState.isAuth});
            fetch("/isAuthenticated").then((res) => res.json())
            .then(function(res){
                This.setAuthState({isLoading: false, isAuth: res.isAuth, isTrainAuth: This.authState.isTrainAuth});
            });

            return (<div>Loading..</div>);
        }

        this.additionItem = this.items.noAuth;
        this.authState = {isAuth: false, isLoading: false, isTrainAuth: false};

        return (noAuthReactComp);
    }

    setAuthState(authState){
        this.authState = authState;
        this.setState({});
    }

    setAdditionItem(item) {
        this.additionItem = item;
        this.setState({});
    }

    render() {
        var navigations = [{ to: "/", value: "Главная" }, { to: "/topics", value: "Топики" },].concat(this.additionItem);
        return ( 
                <div>
                     <header>
                         <div id="header" className="header" >
                            <h1> My Topics </h1> 
                            <p> Add your topic </p>
                            <div className="links">
                                {navigations.map((elem, index) =>
                                    <li key={elem.value + "-" + index}><Link className="title-link" to={elem.to}>{elem.value}</Link></li>
                                )}
                            </div>
                        </div>  
                        <Side main="main" header="header" hendlers={this.hendlers} items={navigations}/>  
                    </header>  
                    <div id="main">
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route path="/Home" component={Home}></Route>  
                            <Route exact path="/topics" render={(() => <Topics onResize={this.hendlers.resize} key="0"/>).bind(this)}></Route>      
                            <Route path="/topics/:topic" component={BigTopic}></Route> 
                            <Route exact path="/insert-topic" render={(() => this.isAuth(<InsertTopic/>, <div>Вы не авторизованы</div>)).bind(this)}></Route>      
                            <Route exact path="/profil" render={(() => <Profil/>).bind(this)}></Route>
                            <Route exact path="/profil/:user" component={Profil}></Route>
                            <Route exact path="/register" component={Register}></Route> 
                            <Route exact path="/login-user" render={
                                (() => this.isAuth(<Home/>, <Login onAuth={(() => this.setAdditionItem(this.items.auth)).bind(this)}/>)).bind(this)}>
                            </Route>  
                            <Route exact path="/logout" render={(function() { 
                                    fetch("/logout").then((res) => res.json())
                                    .then((res) => { if (res.isAuth) window.location.href = "/login-user"; });
                                    return (<div>Loading..</div>);
                                }).bind(this)}>
                            </Route>                        
                            <Route exact path="/myTopics" render={
                                (() => this.isAuth(<Topics myTopics={true} onResize={this.hendlers.resize} key="2"/>, <div>Вы не авторизованы</div>)).bind(this)}>
                            </Route>   
                            <Route exact path="/createrTopics/:createrId" render={
                                ((props) => <Topics {...props} onResize={this.hendlers.resize} key="3"/>).bind(this)}>
                            </Route>           
                        </Switch>  
                    </div>  
                </div>    
        );
    }
}

export default App;