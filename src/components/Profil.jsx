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
            isUndefined: false
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

        fetch("/isCreaterUser", { method: "POST", body: formData})
        .then((res) => res.json())
        .then(function(res){
            var image = man;
            if (res.isAuth != null && !res.isAuth) {
                fetch("/findUser", {method: "POST", body: formData})
                .then((res) => res.json())
                .then(function(res) {
                    if (res == null) 
                        This.setState({isUndefined: true});
                    else {                      
                        if (res.image == "woman") image = woman;
                        This.setState({login: res.login, age: res.age, name: res.name, aboutMe: res.aboutMe, _id: res._id, image: image});
                    }
                }); 
            }
            else if (res.user == null)
                This.setState({isUndefined: true});
            else {
                if (res.user.image == "woman") image = woman;
                This.setState({
                    login: res.user.login,
                    age: res.user.age, 
                    name: res.user.name, 
                    aboutMe: res.user.aboutMe, 
                    _id: res.user._id,
                    isCreater: res.isCreater,
                    image: image
                });
            }
        });
    }

    render() { 	
        if (this.state.isUndefined) return (<div>undifined profil</div>);
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
                                        return <Link to="/myTopics" className="title-link">my topics</Link>;
                                    else
                                        return <Link to={"/createrTopics/" + this.state._id} className="title-link">topics</Link>;
                                }).bind(this)()}             
                                <div className="about-me">
                                    <div className="about">
                                        <h3>about me</h3>
                                        <div className="about-text">{this.state.aboutMe}</div>
                                    </div>
                                    <div className="about">
                                        <h3>name</h3>
                                        <div className="about-text">{this.state.name}</div>
                                    </div>
                                    <div className="about">
                                        <h3>age</h3>
                                        <div className="about-text">{this.state.age}</div>       
                                    </div>  
                                    <div className="about"></div>                             
                                </div>
                                {(() => { 
                                    if (this.state.isCreater) 
                                        return <input type="submit" value="update" onClick={(() => {this.setState({isUpdate: true})}).bind(this)}/> 
                                }).bind(this)()}                
                            </div>
                        );
                }).bind(this)()}
            </div>
        );
    }
}; 

export default Profil;