import "./quizOutput.scss";
import React from "react";
import ReactDOM from "react-dom";
import QuizFront from "./quizFront";

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
