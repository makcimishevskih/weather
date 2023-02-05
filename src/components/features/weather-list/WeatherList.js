import css from "./WeatherList.module.scss";
import WeatherItem from "./weather-item";

// t tt tl ttl
// tomorrow
const WeatherList = ({ today, tomorrow, sliceArrCount }) => {
  if (!today || !tomorrow) return;

  const currentTime = 23;

  const todayTimeWeather = today.hours
    .filter((el, i) => i >= currentTime)
    .slice(0, sliceArrCount);
  const todayTimeWeatherLen = todayTimeWeather.length;
  const tomorrowTimeWeather = today.hours
    .filter((el, i) => i <= currentTime)
    .slice(0, sliceArrCount - todayTimeWeatherLen);
  // const tomorrowTimeWeatherLen = tomorrowTimeWeather.length;

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
