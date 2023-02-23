import React, { useState } from 'react';
import './toggle.css';

function ToggleButton(props) {
  const [isToggled, setToggled] = useState(false);

  function handleToggle() {
    setToggled(!isToggled);
    if (props.onToggle) {
      props.onToggle(!isToggled);
    }
  }

  return (
    <div className={`toggle-button ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
      <div className="toggle-button-inner">
        <div className="toggle-button-text">{isToggled ? props.onText : props.offText}</div>
      </div>
    </div>
  );
}

export default ToggleButton;