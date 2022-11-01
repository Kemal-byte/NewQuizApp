import React from "react";

function Menu(props) {
  return (
    <div className="menu">
      <h1 className="page-title">Random Quizs</h1>
      <span className="page-description">
        An API based randomly generated quizzes
      </span>
      <button className="start-button" onClick={props.start}>
        Start The Quiz
      </button>
    </div>
  );
}

export default Menu;
