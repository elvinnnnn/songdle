import React, { useState } from "react";
import Question from "../classes/Question";

type WaveformProps = {
  question: Question;
  handleRefresh: () => void;
  allSolved: () => boolean;
};

export default function Waveform({
  question,
  handleRefresh,
  allSolved,
}: WaveformProps) {
  const [isHovering, setIsHovered] = useState(false);
  const [answer, setAnswer] = useState("");
  const [reveal, setReveal] = useState(false);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleAnswer = () => {
    const correctAnswer = question.name
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, "");
    const userAnswer = answer.toLowerCase().replace(/[^a-zA-Z ]/g, "");
    question.border =
      userAnswer === correctAnswer ? "border-green-500" : "border-rose-500";
    question.solved = true;
    question.input = userAnswer;
    handleRefresh();
  };

  const handleReveal = () => {
    setReveal(!reveal);
  };

  return (
    <>
      {!question.solved ? (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovering ? (
            <div className="flex justify-center items-center p-[3.83px]">
              <input
                type="text"
                spellCheck="false"
                value={answer}
                onChange={handleAnswerChange}
                className="text-4xl focus:outline-none border-b-2 border-black w-80"
              />
              <button className="pl-2" onClick={handleAnswer}>
                <img width="42px" src="/icons/enter.png" alt="Enter" />
              </button>
            </div>
          ) : (
            <img width="291px" src="/icons/longequalizer.png" alt="Waveform" />
          )}
        </div>
      ) : allSolved() ? (
        <button onClick={handleReveal}>
          {reveal ? (
            <div
              className={`flex items-center justify-center border-blue-500 border-2 w-[450px] h-[58px]`}
            >
              <div className="text-2xl italic">{question.name}</div>
            </div>
          ) : (
            <div
              className={`flex items-center justify-center ${question.border} border-2 w-[450px] h-[58px]`}
            >
              <div className="text-2xl italic">{answer}</div>
            </div>
          )}
        </button>
      ) : (
        <div className="flex items-center justify-center border-2 w-[450px] h-[58px]">
          <div className="text-2xl italic">{answer}</div>
        </div>
      )}
    </>
  );
}
