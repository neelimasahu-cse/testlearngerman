import React, { useState } from 'react';




const questions = [
  {
    id: 1,
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
  },
  {
    id: 2,
    question: 'What are the features of React?',
    answer: 'React is declarative, component-based, and provides a virtual DOM for efficient rendering.',
  },
  {
    id: 3,
    question: 'What is JSX?',
    answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.',
  },
];

function Day36() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswerClick = () => {
    setShowAnswer(true);
  };

  const handlePrevQuestionClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setShowAnswer(false);
  };

  const handleNextQuestionClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowAnswer(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Question {currentQuestionIndex + 1}</h1>
      <h3>{currentQuestion.question}</h3>
      {showAnswer && <p>{currentQuestion.answer}</p>}
      {!showAnswer && (
        <button onClick={handleShowAnswerClick}>Show Answer</button>
      )}
      {currentQuestionIndex > 0 && (
        <button onClick={handlePrevQuestionClick}>Previous Question</button>
      )}
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestionClick}>Next Question</button>
      )}
    </div>
  );
}

export default Day36;
