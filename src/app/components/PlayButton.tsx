import React from "react";

interface PlayButtonProps {
  solved: boolean;
}

export default function PlayButton({ solved }: PlayButtonProps) {
  return !solved ? (
    <img width="58px" src="/icons/playbutton.png" alt="playbutton" />
  ) : null;
}
