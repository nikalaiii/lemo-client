import { useState, useEffect } from "react";

export const TypingText = ({ text, speed = 45 }: { text: string, speed: number }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
  }, []);

  return <span>{display}</span>;
};