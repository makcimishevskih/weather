import { useEffect, useState } from "react";

const useResize = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleResize = () => {
    setWindowSize(() => [window.innerWidth, window.innerHeight]);
  };

  return { windowWidth: windowSize[0], windowHeight: windowSize[1] };
};

export default useResize;
