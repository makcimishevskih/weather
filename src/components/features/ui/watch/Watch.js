import css from "./Watch.module.scss";

import { useEffect, useState } from "react";

const Watch = () => {
  const [timer, setTimer] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const timerId = setInterval(updateTimer, 1000);

    return () => clearTimeout(timerId);
  }, []);

  const updateTimer = () => {
    setTimer(() => ({
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    }));
  };

  return (
    <div className={css.watch}>
      <div className={css.time}>{timer.time}</div>
    </div>
  );
};

export default Watch;
