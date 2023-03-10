import css from "./Info.module.scss";

import Astro from "@features/astro";
import Citys from "@features/citys";
import { object, array } from "prop-types";

const Info = ({ astro, citys }) => {
  if (!!!Object.keys(astro).length || !!!citys.length) return;

  return (
    <div className={css.info}>
      <Astro astro={astro} borderRadius={true} backgroundColor={true} />

      <Citys />
    </div>
  );
};

export default Info;

Info.propTypes = {
  astro: object,
  citys: array,
};
