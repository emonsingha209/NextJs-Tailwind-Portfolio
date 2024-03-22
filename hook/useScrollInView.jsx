import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useScrollInView = (
  threshold = 0.5,
  onInView = null,
  onNotInView = null
) => {
  const [ref, inView] = useInView({
    threshold,
  });
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(inView);

    if (inView && onInView) {
      onInView();
    } else if (!inView && onNotInView) {
      onNotInView();
    }
  }, [inView, onInView, onNotInView]);

  return { ref, isInView };
};

export default useScrollInView;
