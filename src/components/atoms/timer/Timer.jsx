/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./Timer.scss";

const Timer = ({dispatch, secondsRemaining}) => {

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch])

  return (
    <div className="timer">
      <span>{ secondsRemaining }</span>
    </div>
  );
}

export default Timer;