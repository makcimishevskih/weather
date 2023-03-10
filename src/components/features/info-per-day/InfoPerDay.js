import css from "./InfoPerDay.module.scss";

import Table from "@features/table";
import Astro from "@features/astro";

import { arrayOf, object } from "prop-types";

const InfoPerDay = ({ days }) => {
  if (!!!Object.keys(days).length) return;

  const weatherDayTable = days.map((el, i) => (
    <Table
      key={el.date + i}
      day={el}
      days={days}
      id={el.date}
      render={() => (
        <div className={css.tableAstro}>
          <Astro
            astro={el.astro}
            borderRadius={false}
            backgroundColor={false}
          />
        </div>
      )}
    />
  ));

  return (
    <>
      <div className={css.infoPerDay}>{weatherDayTable}</div>
    </>
  );
};

export default InfoPerDay;

InfoPerDay.propTypes = {
  days: arrayOf(object),
};
