import React from "react";

export default function Unavailable({ solved }) {
  return !solved ? (
    <img width="58px" src="/icons/unavailable.png" alt="Unavailable" />
  ) : null;
}
