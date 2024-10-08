"use client";
import "./globals.css";
import React, { useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <html lang="en">
      <body className={darkMode ? "dark bg-black" : "bg-white"}>
        <img
          id="gradient"
          src="/bggradient.png"
          className="absolute -z-50 w-screen h-screen"
        ></img>
        {children}
        <button
          className="button fixed bottom-0 right-0 m-5 p-1 bg-black dark:bg-white hover:bg-neutral-800 text-white font-bold rounded-full"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          🌓
        </button>
      </body>
    </html>
  );
}
