import React, { useState } from "react";
import Question from "../classes/Question";

type WaveformProps = {
  question: Question;
  handleRefresh: () => void;
  allSolved: () => boolean;
};

const Answer = ({ answer, border }: { answer: string; border: string }) => {
  return (
    <div
      className={`answer flex items-center justify-center ${border} border-2 w-[450px] h-[58px]`}
    >
      <div className="text-2xl italic text-black dark:text-white">{answer}</div>
    </div>
  );
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

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  return (
    <div>
      {!question.solved ? (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovering ? (
            <div className="flex justify-center items-center py-[3.83px] pl-[3.83px] filter dark:invert">
              <input
                type="text"
                spellCheck="false"
                value={answer}
                onChange={handleAnswerChange}
                onKeyUp={handleEnter}
                className="text-4xl focus:outline-none border-b-2 border-black w-[237px]"
              />
              <button className="pl-2 button" onClick={handleAnswer}>
                <img width="42px" src="/icons/enter.png" alt="Enter" />
              </button>
            </div>
          ) : (
            <div className="filter dark:invert">
              <img
                width="291px"
                src="/icons/longequalizer.png"
                alt="Waveform"
              />
            </div>
          )}
        </div>
      ) : allSolved() ? (
        <button onClick={handleReveal}>
          {reveal ? (
            <Answer answer={question.name} border={"border-blue-500"} />
          ) : (
            <Answer answer={answer} border={question.border} />
          )}
        </button>
      ) : (
        <Answer answer={answer} border={"border-2"} />
      )}
    </div>
  );
}
