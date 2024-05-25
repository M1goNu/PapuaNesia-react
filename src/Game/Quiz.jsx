import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { data } from "../assets/data";
import { Link } from "react-router-dom";
import { SuccessAlert, WarningAlert, FailAlert, PassAlert } from "../assets/Alert";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const allQuestions = data.slice(0, 30);
const shuffledData = shuffleArray(allQuestions).slice(0, 10);

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(1);
  const [question, setQuestion] = useState(shuffledData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [questionHistory, setQuestionHistory] = useState([index]);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const [username, setUsername] = useState("");
  const [showUsernamePopup, setShowUsernamePopup] = useState(true);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    setQuestion(shuffledData[index]);
  }, [index]);

  const handleStartQuiz = () => {
    if (username.trim() === "") {
      setAlertType("warning");
      setTimeout(() => setAlertType(null), 2000);
    } else {
      setShowUsernamePopup(false);
      setAlertType("success");
      setTimeout(() => setAlertType(null), 2000);
    }
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const getNextUniqueQuestion = () => {
    let remainingQuestions = shuffledData.filter((_, idx) => !questionHistory.includes(idx));
    if (remainingQuestions.length === 0) {
      return -1;
    }
    let randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    let nextQuestionIndex = shuffledData.indexOf(remainingQuestions[randomIndex]);
    return nextQuestionIndex;
  };

  const next = () => {
    if (lock) {
      if (displayIndex === shuffledData.length) {
        setResult(true);
        return;
      }
      const nextIndex = getNextUniqueQuestion();
      setIndex(nextIndex);
      setDisplayIndex(displayIndex + 1);
      setQuestionHistory([...questionHistory, nextIndex]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
      });
    }
  };

  const restart = () => {
    const newShuffledData = shuffleArray(allQuestions).slice(0, 10);
    setIndex(0);
    setDisplayIndex(1);
    setQuestion(newShuffledData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setQuestionHistory([0]);
    setShowUsernamePopup(true);
    setUsername("");
  };

  return (
    <div className="container">
      {alertType === "success" && <SuccessAlert />}
      {alertType === "warning" && <WarningAlert />}
      {alertType === "fail" && <FailAlert />}
      {showUsernamePopup && (
        <div className="username-popup">
          <h2 className="text-center mb-4">Enter Your Username</h2>
          <input
            className="usernameDex"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleStartQuiz} className="bg-blue-500 mt-3 text-white p-2 rounded">
            Start Quiz
          </button>
        </div>
      )}
      {!showUsernamePopup && (
        <>
          <h1>Trivia Seputar Papua</h1>
          <hr />
          {!result ? (
            <>
              <h2>
                {displayIndex}. {question.question}
              </h2>
              <ul>
                <li
                  ref={Option1}
                  onClick={(e) => {
                    checkAns(e, 1);
                  }}
                >
                  {question.option1}
                </li>
                <li
                  ref={Option2}
                  onClick={(e) => {
                    checkAns(e, 2);
                  }}
                >
                  {question.option2}
                </li>
                <li
                  ref={Option3}
                  onClick={(e) => {
                    checkAns(e, 3);
                  }}
                >
                  {question.option3}
                </li>
                <li
                  ref={Option4}
                  onClick={(e) => {
                    checkAns(e, 4);
                  }}
                >
                  {question.option4}
                </li>
              </ul>
              <button onClick={next}>Next</button>
              <div className="index">
                {displayIndex} of {shuffledData.length} Questions.
              </div>
            </>
          ) : (
            <>
              {score < 6 ? <FailAlert /> : <PassAlert />}
              <h2>
                {username ? `${username}, you scored ${score} out of ${shuffledData.length}` : `You scored ${score} out of ${shuffledData.length}`}
              </h2>
              <div className="button-container">
                <button onClick={restart}>Restart</button>
                <Link to="/">
                  <button>Home</button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
