import React, { useState } from "react";

export default function Waveform({ question, handleRefresh, allSolved }) {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswer = () => {
    const correctAnswer = question.name
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, "");
    const userAnswer = answer.toLowerCase().replace(/[^a-zA-Z ]/g, "");
    if (userAnswer === correctAnswer) {
      question.border = "border-green-500";
    } else {
      question.border = "border-rose-500";
    }
    question.solved = true;
    question.input = userAnswer;
    handleRefresh();
  };

  return (
    <>
      {!question.solved ? (
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
                <img width="42px" src="/icons/enter.png" alt="Enter" />
              </button>
            </div>
          ) : (
            <img width="291px" src="/icons/longequalizer.png" alt="Waveform" />
          )}
        </div>
      ) : allSolved() ? (
        <div
          className={`flex items-center justify-center ${question.border} border-2 w-[450px] h-[58px]`}
        >
          <div className="text-2xl italic">{answer}</div>
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 w-[450px] h-[58px]">
          <div className="text-2xl italic">{answer}</div>
        </div>
      )}
    </>
  );
}
