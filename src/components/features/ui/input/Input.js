import css from "./Input.module.scss";

import { string, func } from "prop-types";

const Input = ({
  type = "text",
  value,
  error,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        className={css.input}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error ? <div className={css.error}>{error}</div> : null}
    </>
  );
};

export default Input;

Input.propTypes = {
  type: string,
  value: string,
  error: string,
  onChange: func,
  placeholder: string,
};
