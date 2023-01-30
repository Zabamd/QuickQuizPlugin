
import "./quizFront.scss";
import { useState } from "react";

const QuizFront = ({ props }) => {
    const [haveGuessed, setHaveGuessed] = useState(false);
    const [answeredCorrectly, setAnsweredCorrectly] = useState("");
  
    const onAnswerClick = (answerIndex) => {
      if (answerIndex === Number(props.correctAnswer)) {
        setAnsweredCorrectly(true);
      } else {
        setAnsweredCorrectly(false);
      }
      setHaveGuessed(true);
    };
  
    return (
      <div className={`quickQuiz_quizFrontWrapper result-${answeredCorrectly}`}>
        {!haveGuessed && <h3 className="questionHeading">{props.question}</h3>}
        {!haveGuessed &&
          props.answers.map((answer, answerIndex) => {
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
  
        {haveGuessed && (
          <div className={`resultWrapper result-${answeredCorrectly}`}>
            {answeredCorrectly && (
              <p className="afterGuessMessage">Congratulations! Correct Answer</p>
            )}
            {!answeredCorrectly && (
              <p className="afterGuessMessage"> Good luck next time!</p>
            )}
          </div>
        )}
      </div>
    );
  };

  export default QuizFront;