"use client";
import { useEffect, useState } from "react";

const Typewriter = ({ texts, speed, isInView }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isInView) {
      setCurrentTextIndex(0);
      setDisplayText("");
      return;
    }

    let currentText = "";
    let isDeleting = false;

    const interval = setInterval(() => {
      let currentIndex = currentTextIndex;

      if (isDeleting) {
        currentText = texts[currentIndex].slice(0, currentText.length - 1);
      } else {
        currentText = texts[currentIndex].slice(0, currentText.length + 1);
      }

      setDisplayText(currentText);

      if (!isDeleting && currentText === texts[currentIndex]) {
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [texts, speed, currentTextIndex, isInView]);

  return <span>{displayText}</span>;
};

export default Typewriter;
