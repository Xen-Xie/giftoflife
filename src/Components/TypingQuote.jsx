import React, { useEffect, useState } from "react";
import { cn } from "../lib/Utlities";

const TypingQuote = ({ quotes = [], className }) => {
  const [text, setText] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!quotes.length) return;

    const current = quotes[quoteIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? current.substring(0, charIndex - 1)
          : current.substring(0, charIndex + 1)
      );
      setCharIndex(isDeleting ? charIndex - 1 : charIndex + 1);

      if (!isDeleting && charIndex === current.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setQuoteIndex((quoteIndex + 1) % quotes.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, quoteIndex, quotes]);

  return (
    <h2
      className={cn(
        "min-h-[1.5rem] text-lg",
        className
      )}
    >
      {text}
      <span className="border-r-2 border-white ml-1 animate-pulse" />
    </h2>
  );
};

export default TypingQuote;
