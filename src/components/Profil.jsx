import React from 'react';
import '../css/profil.css';
import { Link } from 'react-router-dom';
import '../css/input.css';
import InsertProfil from '../components/InsertProfil';

import man from '../images/man.png';
import woman from '../images/woman.png';

class Profil extends React.Component { 
    constructor(props){
        super(props);		
        
        this.state = {
            login: "", 
            age: "", 
            name: "", 
            image: man,
            aboutMe: "",
            _id: "",
            isUpdate: false,
            isCreater: false,
            isUndefined: false,
            isLoading: true
        };    
        this.setUser = this.setUser.bind(this);

        if (this.props.match != null && this.props.match.params != null && this.props.match.params.user != null)
            this.user = this.props.match.params.user.toString();
        
        this.setUser();
    }

    setUser(){
        var This = this;
        var formData =  new FormData();

        if (this.user != null) {
            formData.append("login", this.user);
        }

        this.setState({isLoading: true});

        fetch("/isCreaterUser", { method: "POST", body: formData})
        .then((res) => res.json())
        .then(function(res){
            var image = man;
            if (res.isAuth != null && !res.isAuth) {
                fetch("/findUser", {method: "POST", body: formData})
                .then((res) => res.json())
                .then(function(res) {
                    if (res == null) 
                        This.setState({isUndefined: true, isLoading: false});
                    else {                      
                        if (res.image == "woman") image = woman;
                        This.setState({
                            login: res.login, 
                            age: res.age, 
                            name: res.name, 
                            aboutMe: res.aboutMe, 
                            _id: res._id, 
                            image: image,
                            isLoading: false
                        });
                    }
                }); 
            }
            else if (res.user == null)
                This.setState({isUndefined: true, isLoading: false});
            else {
                if (res.user.image == "woman") image = woman;
                This.setState({
                    login: res.user.login,
                    age: res.user.age, 
                    name: res.user.name, 
                    aboutMe: res.user.aboutMe, 
                    _id: res.user._id,
                    isCreater: res.isCreater,
                    image: image,
                    isLoading: false
                });
            }
        });
    }

    render() { 	
        if (this.state.isUndefined) return (<div>undifined profil</div>);
        if (this.state.isLoading) return (<div>loading...</div>);
        return (
            <div>
                {(() => {
                    if (this.state.isUpdate)
                         return ( 
                            <div>
                                <InsertProfil user={this.state} onInsertUpdate={this.setUser}/>
                                <input type="submit" value="to profil" onClick={(() => {this.setState({isUpdate: false})}).bind(this)}/>
                            </div>
                         );
                    else
                        return (
                            <div> 
                                <div className="card">
                                    <img src={this.state.image}/>
                                    <div className="container">
                                        <p>{this.state.login}</p>
                                    </div>           
                                </div>
                                {(() => { 
                                    if (this.state.isCreater) 
                                        return <Link to="/myTopics" className="title-link">Мои топики</Link>;
                                    else
                                        return <Link to={"/createrTopics/" + this.state._id} className="title-link">Топики</Link>;
                                }).bind(this)()}             
                                <div className="about-me">
                                    <div className="about">
                                        <h3>Обо мне</h3>
                                        <div className="about-text">{this.state.aboutMe}</div>
                                    </div>
                                    <div className="about">
                                        <h3>Имя</h3>
                                        <div className="about-text">{this.state.name}</div>
                                    </div>
                                    <div className="about">
                                        <h3>Возраст</h3>
                                        <div className="about-text">{this.state.age}</div>       
                                    </div>  
                                    <div className="about"></div>                             
                                </div>
                                {(() => { 
                                    if (this.state.isCreater) 
                                        return <input className="input-profil" type="submit" value="Обновить" onClick={(() => {this.setState({isUpdate: true})}).bind(this)}/> 
                                }).bind(this)()}                
                            </div>
                        );
                }).bind(this)()}
            </div>
        );
    }
}; 

export default Profil;