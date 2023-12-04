import css from "./TBody.module.scss";

import { translateWeatherCondition } from "@helpers/helpers";

import { object } from "prop-types";

const Tbody = ({ day }) => {
  const timeOfADay = ["Утром", "Днём", "Вечером", "Ночью"];

  const dayWeather = [
    day.hours[7],
    day.hours[12],
    day.hours[18],
    day.hours[23],
  ];

  const tbodyTD = dayWeather.map((el, i) => {
    return (
      <tr className={css.tr} key={el.time} id={day.date + i}>
        <td className={css.day}>
          <div className={css.dayTime}>{timeOfADay[i]}</div>
          <div className={css.dayTemp}>{+el.temp_c.toFixed()}</div>
        </td>
        <td className={css.conditionIconWrapper}>
          <img src={el.condition.icon} alt="condition-weather" />
        </td>
        <td className={css.conditionText}>
          {translateWeatherCondition(el.condition.text)}
        </td>
        <td>{(el.pressure_mb * 0.75).toFixed()}</td>
        <td>{el.humidity}%</td>
        <td >
          {Math.round(el.wind_kph * (1000 / 3600))} {el.wind_dir.toLowerCase()}
        </td>
        <td className={css.feelsLike}>{el.feelslike_c.toFixed()}</td>
      </tr>
    );
  });

  return <tbody className={css.tbody}>{tbodyTD}</tbody>;
};

export default Tbody;

Tbody.propTypes = {
  day: object,
};
