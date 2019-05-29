import React from 'react';
import '../css/modal.css';
import { Link } from 'react-router-dom';

class ModalWindow extends React.Component { 

  render() { 
    var This = this;  
    
	return (
        <div>
            <a href="#x" className="overlay" id="modal-winodw"></a>
            <div className="popup">
                Вы уверены? 
                <a className="close" title="Закрыть" href="#close"></a>

                <input type="submit" value="Да" onClick={function() { 
                        This.props.onYesClickModal(); 
                        window.location.href = "#x";
                    }}/>
                <input type="submit" value="Нет" onClick={() => window.location.href = "#x"}/>
            </div>
        </div>
      );
  }
};

export default ModalWindow;