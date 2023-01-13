import "./quickQuiz.scss";
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
} from "@wordpress/components";

wp.blocks.registerBlockType("quizblock/mainquiz", {
  title: "Quiz Block",
  description: "My Quiz Block",
  edit: EditComponent,
  save: SaveComponent,
  attributes: {
    Question: { type: "string" },
    AnswersArray: { type: "array", default: [] },
    CorrectAnswer: { type: "number", default: -1 },
  },
});

function EditComponent(props) {
  const onAddAnswerClick = () => {
    props.setAttributes({
      AnswersArray: [...props.attributes.AnswersArray, ""],
    });
  };
  const onQuestionChange = (value) => {
    props.setAttributes({ Question: value });
  };

  const onDeleteClick = (answerIndex) => {
    let newArray = props.attributes.AnswersArray;
    let newAnswer;

    if (props.attributes.CorrectAnswer === answerIndex) {
      newAnswer = -1;
    } else if (
      props.attributes.CorrectAnswer > answerIndex &&
      props.attributes.CorrectAnswer !== -1
    ) {
      newAnswer = props.attributes.CorrectAnswer - 1;
    } else {
      newAnswer = props.attributes.CorrectAnswer;
    }

    newArray = newArray
      .slice(0, answerIndex)
      .concat(newArray.slice(answerIndex + 1, newArray.length));
    props.setAttributes({
      AnswersArray: newArray,
      CorrectAnswer: newAnswer,
    });
  };

  return (
    <div className="quickQuiz_quizEditWrapper">
      <TextControl
        label="Quiz Question:"
        className="questionText"
        value={props.attributes.Question}
        onChange={onQuestionChange}
      />
      <p className="answersHeader">Answers:</p>
      {[...Array(props.attributes.AnswersArray.length)].map(
        (answer, answerIndex) => {
          return (
            <Flex key={answerIndex}>
              <FlexBlock>
                <TextControl
                  className="answerText"
                  value={props.attributes.AnswersArray[answerIndex]}
                  onChange={(newValue) => {
                    const newArray = props.attributes.AnswersArray.concat([]);
                    newArray[answerIndex] = newValue;
                    props.setAttributes({
                      AnswersArray: newArray,
                    });
                  }}
                />
              </FlexBlock>
              <FlexItem>
                <Button
                  className={
                    "iconButton" +
                    (props.attributes.CorrectAnswer === answerIndex
                      ? " correctAnswer "
                      : "")
                  }
                  onClick={() => {
                    props.setAttributes({
                      CorrectAnswer: answerIndex,
                    });
                  }}
                >
                  <Icon className="selectAnswerIcon" icon="marker" />
                </Button>
              </FlexItem>
              <FlexItem>
                <Button
                  className="iconButton"
                  onClick={() => {
                    onDeleteClick(answerIndex);
                  }}
                >
                  <Icon className="deleteAnswerIcon" icon="trash" />
                </Button>
              </FlexItem>
            </Flex>
          );
        }
      )}
      <Button isPrimary onClick={onAddAnswerClick}>
        Add another answer
      </Button>
    </div>
  );
}

function SaveComponent(props) {
  return (
    <div className="quickQuiz_quizPlaceholder">
      <p id="quickQuiz_data_question">{props.attributes.Question}</p>
      <p id="quickQuiz_data_answers">
        {props.attributes.AnswersArray.toString()}
      </p>
      <p id="quickQuiz_data_correct">{props.attributes.CorrectAnswer}</p>
    </div>
  );
}
