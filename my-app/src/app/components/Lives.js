import React from "react";

export default function Lives({ lives }) {
  return (
    <div className="flex items-center pr-1">
      {lives === 1 ? (
        <img width="15px" src="/icons/onelife.png" alt="Heart" />
      ) : lives === 2 ? (
        <img width="15px" src="/icons/twolife.png" alt="Heart" />
      ) : lives === 3 ? (
        <img width="15px" src="/icons/threelife.png" alt="Heart" />
      ) : (
        <img width="15px" src="/icons/zerolife.png" alt="Heart" />
      )}
    </div>
  );
}
