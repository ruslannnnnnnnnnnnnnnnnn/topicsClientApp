import React from 'react';
import '../css/topic.css';
import { Link } from 'react-router-dom';

class Topic extends React.Component { 

  render() { 	
	  return (
        <div className="topic">
            <div className="create-topic">
                creater:
                <Link to={"/profil/" + this.props.creater} className="creater-link">{this.props.creater}</Link>
            </div>
            <h2>
                <Link className="title-link" to={"/topics/" + this.props._id}>
                    {this.props.title}
                </Link>
            </h2>
            <div className="topic-text">
                { (function(This) { 
                    if (This != null && This.props != null && This.props.text != null)
                        return This.props.text.substring(0, 100) + "..." ;
                    })(this) 
                }
            </div>
        </div>
      );
  }
}; 

export default Topic;