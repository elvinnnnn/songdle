import React, { useState } from "react";

export default function Waveform({ trackName, handleScoreChange }) {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswer = () => {
    const correctAnswer = trackName.toLowerCase().replace(/[^a-zA-Z ]/g, "");
    const userAnswer = answer.toLowerCase().replace(/[^a-zA-Z ]/g, "");
    console.log(correctAnswer + userAnswer);
    if (userAnswer === correctAnswer) {
      handleScoreChange(true);
    } else {
      handleScoreChange(false);
    }
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {isHovering ? (
        <div className="flex justify-center items-center p-[3.83px]">
          <input
            type="text"
            spellCheck="false"
            value={answer}
            onChange={handleAnswerChange}
            className="text-4xl focus:outline-none border-b-2 border-black w-80"
          ></input>
          <button className="pl-2" onClick={handleAnswer}>
            <img width="56px" src="/icons/enter.png" alt="Enter" />
          </button>
        </div>
      ) : (
        <img width="320px" src="/icons/longequalizer.png" alt="Waveform" />
      )}
    </div>
  );
}
