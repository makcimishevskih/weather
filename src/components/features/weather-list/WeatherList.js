import css from "./WeatherList.module.scss";
import WeatherItem from "./weather-item";

import { object, number } from "prop-types";

const WeatherList = ({ today, tomorrow, sliceArrCount }) => {
  if (!today || !tomorrow) return;

  const currentTime = new Date().getHours();

  const todayTimeWeather = today.hours
    .filter((el, i) => i >= currentTime)
    .slice(0, sliceArrCount);
  const todayTimeWeatherLen = todayTimeWeather.length;
  const tomorrowTimeWeather = today.hours
    .filter((el, i) => i <= currentTime)
    .slice(0, sliceArrCount - todayTimeWeatherLen);

  return (
    <div className={css.weatherList}>
      {!!todayTimeWeather
        ? todayTimeWeather.map((el) => <WeatherItem key={el.time} {...el} />)
        : null}
      {!!tomorrowTimeWeather
        ? tomorrowTimeWeather.map((el) => <WeatherItem key={el.time} {...el} />)
        : null}
    </div>
  );
};

export default WeatherList;

WeatherList.propTypes = {
  today: object,
  tomorrow: object,
  sliceArrCount: number,
};
