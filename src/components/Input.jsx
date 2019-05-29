import React from 'react';

class Input extends React.Component { 

    constructor(props){
		super(props);		
        
        this.onChangeInput = this.onChangeInput.bind(this);
        this.input = new 
        console.log(this.input.props);
       // this.input.props = this.props;
        //this.input.props.onChange = this.onChangeInput;
    }
    
    onChangeInput() {
        this.value = this.value;
    }
  
    render() { 	
        return this.input;
    }
}; 

export default Input;