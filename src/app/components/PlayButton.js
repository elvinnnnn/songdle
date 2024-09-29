import React from "react";

export default function PlayButton({ solved }) {
  return !solved ? (
    <img width="58px" src="/icons/playbutton.png" alt="playbutton" />
  ) : null;
}
