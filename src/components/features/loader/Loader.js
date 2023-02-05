import css from "./Loader.module.scss";

const Loader = (props) => {
  const classes = { ...props };

  return <div style={classes} className={css.loader} role="status"></div>;
};

export default Loader;
