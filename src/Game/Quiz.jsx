import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../assets/data";
import ReCAPTCHA from "react-google-recaptcha";


function onChange(value) {
  console.log("Captcha value:", value);
  setIsVerified(true);
}

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
  let [index, setIndex] = useState(0);
  let [displayIndex, setDisplayIndex] = useState(1);
  let [question, setQuestion] = useState(shuffledData[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [questionHistory, setQuestionHistory] = useState([index]);
  const [isVerified, setIsVerified] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const [username, setUsername] = useState("");
  const [showUsernamePopup, setShowUsernamePopup] = useState(true);

  const handleStartQuiz = () => {
    if (username.trim() !== "" && isVerified) {
      setShowUsernamePopup(false);
    }
  };

  function onChange(value) {
    console.log("Captcha value:", value);
    setIsVerified(true);
  }

  const checkAns = (e, ans) => {
    if (lock === false) {
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
    if (lock === true) {
      if (displayIndex === shuffledData.length) {
        setResult(true);
        return;
      }
      const nextIndex = getNextUniqueQuestion();
      setIndex(nextIndex);
      setQuestion(shuffledData[nextIndex]);
      setLock(false);
      setDisplayIndex(displayIndex + 1);
      setQuestionHistory([...questionHistory, nextIndex]);
      option_array.forEach((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
      });
    }
  };

  const restart = () => {
    setIndex(0);
    setDisplayIndex(1);
    setQuestion(shuffledData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setQuestionHistory([0]);
  };

  return (
    <div className="container">
    {showUsernamePopup && (
      <div className="username-popup flex flex-col items-center justify-center">
        <h2 className="text-center mb-4">Enter Your Username</h2>
        <input
          className="usernameDex mb-10 p-2 border border-gray-300 rounded"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <ReCAPTCHA sitekey="6LencNkpAAAAAGYqVlqh7GtOZ_4jbszJ0IMbWWTq" onChange={onChange}/>
        <button onClick={handleStartQuiz} className="bg-blue-500 mt-3 text-white p-2 rounded" disabled={!isVerified}>Start Quiz</button>
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
              <h2>
                 {username ? `${username}, you scored ${score} out of ${shuffledData.length}` : `You scored ${score} out of ${shuffledData.length}`}
              </h2>
              <button onClick={restart}>Restart</button>
              <button onClick={() => window.location.href = '/'}>Home</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;