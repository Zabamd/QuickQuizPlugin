import "./quizOutput.scss";
import React from "react";
import ReactDOM from "react-dom";

const QuizFront = (props) => {
  return (
    <div className="anwserWrapper">
     {/*  {props.answers.map((answer) => {
        return (
          <div className="answer">
            <p>{answer.toString()}</p>
          </div>
        );
      })} */}
      <p>{props.text + " Front"}</p>
    </div>
  );
};

const onDOMContentLoaded = () => {
  const placeholderSelector = [].slice.call(
    document.getElementsByClassName("quizPlaceholder")
  );
  
  placeholderSelector.forEach((element) => {
    let props = element.innerHTML; 
    ReactDOM.render(<QuizFront text={props} />, element);
    element.classList.remove("quizPlaceholder");
  });
};

addEventListener("DOMContentLoaded", onDOMContentLoaded);
