import React from 'react';
import '../css/home.css';

class Home extends React.Component { 

  render() { 	
	  return (
      <div className="home">
        <p>На сайте можно добавлять новые записи по разным темам или редктировать существующие,</p>
        <p>которые видны всем, для этого нужно зарегистрироваться или авторизоваться</p>    
      </div>
    );
  }
}; 

export default Home;
