"use client";
import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleResize = () => {
      setMatches(mediaQuery.matches);
    };

    mediaQuery.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("resize", handleResize);
    };
  }, [query]);

  return matches;
};
export default useMediaQuery;
