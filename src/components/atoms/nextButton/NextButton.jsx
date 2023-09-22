/* eslint-disable react/prop-types */
import "./NextButton.scss";

const NextButton = ({ dispatch, answer, numOfQuestions, index }) => {
  if (answer === null) return null;
  if (index < numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    );
  
    if (index === numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}>
        Finish Quiz
      </button>
    );
};

export default NextButton;
