import React from 'react';
import '../css/side.css';
import { Link } from 'react-router-dom';
import Topic from '../components/Topic';
import Search from '../components/Search';

import '../css/topic.css';

class Topics extends React.Component { 

	constructor(props){
		super(props);		
    this.state = {topics: []};
    this.topics = this.topics.bind(this);
    this.scroll = this.scroll.bind(this);
    this.setOptionSearch = this.setOptionSearch.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.checkboxs = [];
    this.back = {search: () => {}, setCheckboxs: ((boxs) => this.checkboxs = boxs).bind(this)};
    this.url = "/find";
    this.isLoading = false;

    if (this.props.myTopics) {
      this.url = "/findMyTopics";
    }
    else if ( this.props.match != null && this.props.match.params != null && this.props.match.params.createrId != null) {
      this.url = "/findCreaterTopics";
      this.createrId = this.props.match.params.createrId.toString();
    }
  }

  topics(){
    var thisTopic = this;

    if (thisTopic.isLoading) return;
    thisTopic.isLoading = true;

    this.back.search(this.setOptionSearch(this.state.topics.length), (topics) => {
      thisTopic.setState({topics: thisTopic.state.topics.concat(topics)})
      thisTopic.props.onResize();
      thisTopic.isLoading = false;
    });
  }

  scroll() {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop 
        == document.documentElement.scrollHeight) {
      this.topics();  
    }
  }

  callBackSearch(topics, toks) {
    this.setState({topics: topics});
  }

  setOptionSearch(from, to) {
    if (from == null) from = 0;
    if (to == null) to = 5;

    var formData = new FormData();
    formData.append("for", from);
    formData.append("to", to);
    
    if (this.createrId != null) formData.append("createrId", this.createrId);

    return {
      method: "POST",
      body: formData
    };
  }

  render() { 	
	  return (
      <div>
        <Link to="/insert-topic" className="insert-link">Создать новую тему</Link>
        <Search callBack={this.callBackSearch} setOption={this.setOptionSearch} url={this.url} back={this.back} checkboxs={this.checkboxs}/>   
        {
          this.state.topics.map(function(topic, index){
            return <Topic key={index + "-topic"} title={topic.title} text={topic.text} _id={topic._id} creater={topic.createrLogin}/>
          })
        }
      </div>
    );
  }

  componentDidMount() {
    this.topics();
    window.addEventListener("scroll", this.scroll);
    fetch("/isAuthenticated").then((res) => res.json())
    .then(((res) => {
      if (!res.isAuth || this.props.myTopics || this.createrId != null) return;
      this.back.setCheckboxs([
        {
          onChange: (checkbox, topics) => {
            if (checkbox.checked) topics.url = "/findMyTopics"; 
            else topics.url = "/find";
          }, 
          text: "my topics", 
          default: this.props.myTopics
        }
      ]);
    }).bind(this));
  }

  componentWillUnmount() {
    this.props.onResize(true);
    window.removeEventListener("scroll", this.scroll);
  }
}; 

export default Topics;