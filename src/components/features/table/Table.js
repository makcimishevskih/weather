import css from "./Table.module.scss";

import { useInView, animated } from "@react-spring/web";

import Thead from "./t-head/Thead.js";
import Tbody from "./t-body/Tbody.js";
import { dayUVIndex } from "@helpers/helpers";

import { object, func } from "prop-types";

const Table = ({ day, render }) => {
  const [ref, styles] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 80,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      once: true,
    }
  );

  return (
    <animated.div className={css.tableWrapper} ref={ref} style={styles}>
      <div className={css.tableFlex}>
        <table>
          <Thead day={day} />
          <Tbody day={day} />
        </table>
        <div className={css.tableAstro}>
        {render()}
        </div>
      </div>
      <div className={css.uv}>
        УФ-индекс: {day.day.uv}, {dayUVIndex(day.day.uv)}
      </div>
    </animated.div>
  );
};

export default Table;

Table.propTypes = {
  day: object,
  render: func,
};
