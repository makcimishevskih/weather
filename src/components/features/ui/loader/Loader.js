import css from "./Loader.module.scss";

import { object } from "prop-types";

const Loader = (props) => {
  const classes = {
    ...props,
  };

  return (
    <div className={css.wrapper}>
      <div style={classes} className={css.loader} role="status"></div>;
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  props: object,
};
