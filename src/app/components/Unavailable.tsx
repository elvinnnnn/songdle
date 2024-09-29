import React from "react";

interface UnavailableProps {
  solved: boolean;
}

export default function Unavailable({ solved }: UnavailableProps) {
  return !solved ? (
    <img width="58px" src="/icons/unavailable.png" alt="Unavailable" />
  ) : null;
}
