import { NavLink } from "react-router-dom";
import css from "./WeekWeather.module.scss";

import WeekWeatherList from "./WeekWeatherList";

const WeekWeather = ({ days, weather }) => {
  if (!!!Object.keys(days).length || !!!Object.keys(weather).length) return;

  return (
    <div className={css.weekWeather}>
      <header className={css.weekWeatherHeader}>
        <h2 className={css.title}>Прогноз на 10 дней</h2>
        <div className={css.btnGroup}>
          <NavLink className={css.btn} to="/tenDaysWeather">
            Подробный прогноз на 10 дней
          </NavLink>
        </div>
      </header>
      <WeekWeatherList days={days} />
    </div>
  );
};

export default WeekWeather;
