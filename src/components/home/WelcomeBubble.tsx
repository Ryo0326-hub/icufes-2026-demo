"use client";

import { useEffect, useState } from "react";

const greetings = [
  "ようこそ",
  "Welcome",
  "Bienvenidos",
  "Bienvenue",
  "환영합니다",
  "Hoş geldiniz"
];

export function WelcomeBubble() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % greetings.length);
        setIsVisible(true);
      }, 300);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block min-w-44 max-w-96 rounded-[2rem] border-[4px] border-slate-950 bg-white px-7 py-4 text-slate-950 shadow-[0_18px_42px_rgba(0,0,0,0.38)]">
      <div className="absolute -bottom-4 left-4 h-6 w-7 rotate-[18deg] bg-slate-950 [clip-path:polygon(0_0,100%_18%,18%_100%)]" />
      <div className="absolute -bottom-[13px] left-[19px] h-5 w-6 rotate-[18deg] bg-white [clip-path:polygon(0_0,100%_18%,18%_100%)]" />
      <p
        className={`relative whitespace-nowrap text-center text-2xl font-black tracking-tight transition-opacity duration-300 sm:text-3xl ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {greetings[index]}
      </p>
    </div>
  );
}
