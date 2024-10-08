import React from "react";

interface UnavailableProps {
  solved: boolean;
}

export default function Unavailable({ solved }: UnavailableProps) {
  return !solved ? (
    <div className="filter dark:invert">
      <img
        className="unavailable-icon filter dark:invert"
        width="58px"
        src="/icons/unavailable.png"
        alt="Unavailable"
      />
    </div>
  ) : null;
}
