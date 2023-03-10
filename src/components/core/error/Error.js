import css from "./Error.module.scss";

import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div id="error-page" className={css.errorPage}>
      <h1>Упс! Ошибка!</h1>
      <p>Извините, произошла непредвиденная ошибка</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default Error;
