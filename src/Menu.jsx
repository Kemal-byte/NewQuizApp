import React from "react";

function Menu(props) {
  return (
    <div className="menu">
      <h1 className="page-title">QUizzical</h1>
      <span className="page-description">Description</span>
      <button className="start-button" onClick={props.start}>
        Start Quizs
      </button>
    </div>
  );
}

export default Menu;
