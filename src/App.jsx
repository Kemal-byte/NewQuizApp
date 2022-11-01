import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Menu from "./Menu";
import Question from "./Question";
import blob5 from "./images/blob5.png";
import blob6 from "./images/blob6.png";

function App() {
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [checked, setChecked] = useState(false);
  const [questions, setQuestions] = useState([]);

  function start() {
    console.log("start clicked");
    setStarted((x) => !x);
  }

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      let q = [];
      data.results.forEach((question) => {
        q.push({
          id: nanoid(),
          question: question.question,
          correct: question.correct_answer,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          selected: null,
          checked: false,
        });
      });
      setQuestions(q);
    }
    getQuestions();
  }, [count]);

  function handleCheck() {
    let selected = true;
    questions.forEach((question) => {
      if (question.selected === null) {
        selected = false;
        return;
      }
    });
    if (!selected) {
      return;
    }
    setQuestions((prev) =>
      prev.map((question) => {
        return { ...question, checked: true };
      })
    );
    setChecked(true);
    let correct = 0;

    questions.forEach((question) => {
      if (question.correct === question.selected) {
        correct += 1;
      }
    });
    setCorrect(correct);
  }

  function handleClickAnswer(id, answer) {
    setQuestions((questions) =>
      questions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer }
          : question;
      })
    );
  }

  function handlePlayAgain() {
    setCount((count) => count + 1);
    setChecked(false);
  }

  const questionElement = questions
    ? questions.map((question) => {
        return (
          <Question
            key={question.id}
            q={question}
            handleClickAnswer={handleClickAnswer}
            id={question.id}
          />
        );
      })
    : [];

  return (
    <div className="main-container">
      <img src={blob5} className="blob left" alt="" />
      <img src={blob6} className="blob right" alt="" />
      <div className="content-container">
        {started ? (
          <div className="start-content-container">
            {questionElement}
            <div className="end-div">
              {checked && <span className="score">You scored {correct}</span>}
              <button
                className="check"
                onClick={checked ? handlePlayAgain : handleCheck}
              >
                {checked ? "Play Again" : "Check Answers"}
              </button>
            </div>
          </div>
        ) : (
          <Menu start={start} />
        )}
      </div>
    </div>
  );
}

export default App;
