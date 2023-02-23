import "./dropdown.css"
import React from "react";

const ExpandingMessage = () => {
  return (
    <div className="expanding-message">
      <p className="before-expand">Instructions</p>
      <p className="after-expand">Try to guess what team all 5 players have played for. Each wrong guess makes it easier.</p>
    </div>
  );
};

export default ExpandingMessage;