import css from "./Input.module.scss";

const Input = ({
  type = "text",
  value,
  error,
  onFocus,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        className={css.input}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
      />
      {error ? <div className={css.error}>{error}</div> : null}
    </div>
  );
};

export default Input;
