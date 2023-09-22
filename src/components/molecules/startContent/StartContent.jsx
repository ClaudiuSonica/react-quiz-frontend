/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import "./StartContent.scss";

const StartContent = ({ numOfQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
};

export default StartContent;
