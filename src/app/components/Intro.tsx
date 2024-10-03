import React, { useEffect, useState, useRef } from "react";

interface IntroProps {
  onButtonClick: (artist: string) => void;
}

export default function Intro({ onButtonClick }: IntroProps) {
  const [artist, setArtist] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(e.target.value);
  };
  const handleButtonClick = () => {
    onButtonClick(artist);
  };

  const adjustInputWidth = () => {
    const input = inputRef.current;
    if (input) {
      input.style.width = `${input.scrollWidth}px`;
    }
  };
  useEffect(() => {
    const input = inputRef.current;
    if (artist === "") {
      if (input) {
        input.style.width = "5rem";
      }
    }
  }, [artist]);
  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <div className="grid gap-4 grid-rows-4 place-items-center">
          <div className="text-5xl dark:text-white font-bold">Songdle.</div>
          <div className="justify-self-stretch">
            <div className="text-2xl dark:text-white">
              How well do you know{" "}
              <input
                type="text"
                spellCheck="false"
                value={artist}
                onChange={handleArtistChange}
                ref={inputRef}
                onInput={adjustInputWidth}
                className="text-2xl w-20 focus:outline-none border-b-2 border-black dark:border-white dark:bg-black"
              ></input>
              's music?
            </div>
          </div>
          <div>
            <button
              onClick={handleButtonClick}
              id="lets-play-button"
              className="block bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 w-full p-4  font-bold py-2 px-4 rounded-full"
            >
              Let's Play!
            </button>
          </div>
          <div className="italic dark:text-white text-sm">
            By Elvin Lee 09.2024
          </div>
        </div>
      </div>
    </div>
  );
}
