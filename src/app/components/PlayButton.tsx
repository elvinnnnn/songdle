import React from "react";

interface PlayButtonProps {
  solved: boolean;
}

export default function PlayButton({ solved }: PlayButtonProps) {
  return !solved ? (
    <div className="filter dark:invert">
      <img
        width="58px"
        className="button"
        src="/icons/playbutton.png"
        alt="playbutton"
      />
    </div>
  ) : null;
}
