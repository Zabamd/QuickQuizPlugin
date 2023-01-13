import "./quizOutput.scss";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const QuizFront = ({ props }) => {
  const [haveGuessed, setHaveGuessed] = useState("");
  const onAnswerClick = (answerIndex) => {
    if (answerIndex == props.correctAnswer) {
      setHaveGuessed(true);
    } else {
      setHaveGuessed(false);
    }
  };

  return (
    <div className="quickQuiz_quizFrontWrapper">
      {haveGuessed === true && <div className="quizFrontOverLay"></div>}
      <h3 className="questionHeading">{props.question}</h3>
      {props.answers.map((answer, answerIndex) => {
        return (
          <button
            onClick={() => {
              onAnswerClick(answerIndex);
            }}
            className="answerButton"
            key={answerIndex}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
};

const onDOMContentLoaded = () => {
  const placeholderSelector = [].slice.call(
    document.getElementsByClassName("quickQuiz_quizPlaceholder")
  );

  placeholderSelector.forEach((element) => {
    const question = element.children[0].textContent;
    const answers = element.children[1].textContent.split(",");
    const correctAnswer = element.children[2].textContent;

    ReactDOM.render(
      <QuizFront props={{ question, answers, correctAnswer }} />,
      element
    );
    element.classList.remove("quickQuiz_quizPlaceholder");
  });
};

addEventListener("DOMContentLoaded", onDOMContentLoaded);
