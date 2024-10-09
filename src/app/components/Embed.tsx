import React from "react";

export default function Embed({ videoId }: { videoId: string }) {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}?start=10&end=11&autoplay=1`}
      allow="autoplay"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        border: 0,
      }}
    ></iframe>
  );
}
