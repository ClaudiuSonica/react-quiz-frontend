/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from "react";
import Header from "./components/molecules/header/Header";
import Main from "./components/molecules/main/Main";
import Loader from "./components/atoms/loader/Loader";
import Error from "./components/atoms/error/Error";
import StartContent from "./components/molecules/startContent/StartContent";
import Question from "./components/molecules/question/Question";
import NextButton from "./components/atoms/nextButton/NextButton";
import Progress from "./components/molecules/progress/Progress";
import FinishContent from "./components/molecules/finishContent/FinishContent";
import Footer from "./components/molecules/footer/Footer";
import Timer from "./components/atoms/timer/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 1000,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer": {
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action!");
  }
};

const apiURL = "/.netlify/functions/questions";

const App = () => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const maxPossiblePoints =
    questions.length > 0
      ? questions.reduce((prev, cur) => prev + cur.points, 0)
      : 0;

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(apiURL, {
              method: "GET",
              mode: "cors",
            });
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
      
            const data = await response.json();
            dispatch({ type: "dataReceived", payload: data.questions });
          } catch (err) {
            console.error("Error fetching data:", err);
            dispatch({ type: "dataFailed" });
          }
        };
      
        fetchData();
      }, []);
      

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartContent numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numOfQuestions={numOfQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishContent
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
