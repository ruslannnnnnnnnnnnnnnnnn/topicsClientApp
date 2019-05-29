import React from 'react';
import { Link } from 'react-router-dom';
import '../css/input.css';
import man from '../images/man.png';
import woman from '../images/woman.png';

class InsertProfil extends React.Component { 

    constructor(props){
        super(props);		
        this.saveUpdate = this.saveUpdate.bind(this);
    }

    saveUpdate() {      
        var formData = new FormData(document.forms["insert-profile"]);
        var This = this;

        if (this.image != null) formData.append("image", this.image);

        fetch("/updateUser", {
            method: "POST",
            body: formData
        }).then(function(){
            This.setState({isUpdate: false});
            if (This.props.onInsertUpdate != null) {
                This.props.onInsertUpdate();
            }
        });
    }

    onClickImage(prev, now){
        if (prev != null)
             document.getElementById(prev).classList.remove("click");
        document.getElementById(now).classList.add("click");
    }

    render() { 	
        return (
            <form id="insert-profile" name="insert-profile">           
                <div className="container">
                    <label>
                        about you
                        <div className="input-border"><textarea id="aboutMe" name="aboutMe" defaultValue={this.props.user.aboutMe}/></div>
                    </label>
                    <label>
                        name
                        <div className="input-border"><input type="text" id="name" name="name" value={this.props.user.name}/></div>
                    </label>
                    <label>
                        age
                        <div className="input-border"><input type="text" id="age" name="age" value={this.props.user.age}/></div>  
                    </label>  
                    <div className="images">
                        <img id="man" onClick={(() => this.onClickImage(this.image, this.image = "man")).bind(this)} src={man}/>
                        <img id="woman" onClick={(() => this.onClickImage(this.image, this.image = "woman")).bind(this)} src={woman}/>
                    </div>  
                    <input type="submit" value="save" onClick={this.saveUpdate}/>
                </div>
            </form>
        );
    }
}; 

export default InsertProfil;