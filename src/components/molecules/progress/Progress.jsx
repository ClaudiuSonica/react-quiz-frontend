/* eslint-disable react/prop-types */
import "./Progress.scss";

const Progress = ({
  index,
  numOfQuestions,
  points,
  maxPossiblePoints,
  answer,
}) => {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        {points}/{maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
