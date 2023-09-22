/* eslint-disable react/prop-types */
import Options from "../../atoms/options/Options";
import "./Question.scss";

const Question = ({ question, dispatch, answer }) => {
  return (
    <div className="">
      <h4>{question.question}</h4>

      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Question;