import React, { useEffect, useState, useRef } from "react";

export default function Intro({ onButtonClick }) {
  const [artist, setArtist] = useState("");
  const inputRef = useRef(null);

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };
  const handleButtonClick = () => {
    onButtonClick(artist);
  };

  const adjustInputWidth = () => {
    const input = inputRef.current;
    input.style.width = `${input.scrollWidth}px`;
  };
  useEffect(() => {
    if (artist === "") {
      inputRef.current.style.width = "5rem";
    }
  }, [artist]);
  return (
    <div className="flex h-screen justify-center items-center">
      <div>
        <div className="grid gap-4 grid-rows-4 place-items-center">
          <div className="text-5xl font-bold">Songdle.</div>
          <div className="justify-self-stretch">
            <div className="text-2xl">
              How well do you know{" "}
              <input
                type="text"
                spellCheck="false"
                value={artist}
                onChange={handleArtistChange}
                ref={inputRef}
                onInput={adjustInputWidth}
                className="text-2xl w-20 focus:outline-none border-b-2 border-black"
              ></input>
              's music?
            </div>
          </div>
          <div>
            <button
              onClick={handleButtonClick}
              className="block bg-black hover:bg-neutral-800 w-full p-4 text-white font-bold py-2 px-4 rounded-full"
            >
              Let's Play!
            </button>
          </div>
          <div className="italic text-sm">By Elvin Lee 09.2024</div>
        </div>
      </div>
    </div>
  );
}
