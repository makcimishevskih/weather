import css from "./InfoPerDay.module.scss";

import Table from "@features/table";
import Astro from "@features/astro";

const InfoPerDay = ({ days }) => {
  if (!!!Object.keys(days).length) return;

  const weatherDayTable = days.map((el, i) => (
    <Table
      key={el.date + i}
      day={el}
      days={days}
      id={el.date}
      render={() => (
        <Astro astro={el.astro} borderRadius={false} backgroundColor={false} />
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
