import css from "./CurrentWeather.module.scss";

import { arrayOf, object, oneOfType } from "prop-types";

import sun from "@images/sun.jpg";
import mist from "@images/mist.jpg";
import rain from "@images/rain.jpg";
import snow from "@images/snow.jpg";
import cloud from "@images/cloud.webp";

import wind from "@icons/wind.png";
import humidity from "@icons/humidity.png";
import pressure from "@icons/pressure.png";

import { translateWeatherCondition } from "@helpers/helpers";

import WeatherList from "@features/weather-list";

const CurrentWeather = ({ weather, days, location }) => {
  if (!!!Object.keys(days).length || !!!Object.keys(weather).length) return;

  function defineBackgroundImage(weather) {
    if (/snow/gi.test(weather)) {
      return snow;
    } else if (/rain/gi.test(weather)) {
      return rain;
    } else if (/sun|clear/gi.test(weather)) {
      return sun;
    } else if (/mist/gi.test(weather)) {
      return mist;
    } else if (/cloud|overcast|/gi.test(weather)) {
      return cloud;
    }
  }

  const currentImage = defineBackgroundImage(weather.conditionText.trim());

  const imageStyle = {
    background: `url(${currentImage}) no-repeat 50% 50% / cover`,
  };

  return (
    <div className={css.currentWeather} style={imageStyle}>
      <h2 className={css.title}>
        {location.city}
        {location.district ? `, ${location.district}` : ""}
      </h2>
      <h5 className={css.subtitle}>Прогноз на {weather.localtime}</h5>
      <div className={css.weatherInfo}>
        <div className={css.weather}>
          <span className={css.weatherDegree}>{weather.temp}</span>
          <div className={css.imgWrapper}>
            <img
              className={css.weatherImg}
              src={weather.conditionIcon}
              alt="weather-icon"
            />
          </div>
        </div>
        <div className={css.weatherText}>
          <span>{translateWeatherCondition(weather.conditionText)}</span>
          <span>Ощущается как {weather.feelsLike}</span>
        </div>
      </div>
      <div className={css.weatherData}>
        <div className={css.weatherDataItem}>
          <img src={wind} alt="wind" />
          <span className={css.wind}>
            {Math.round(weather.windKph)} м/с, {weather.windDirection}
          </span>
        </div>
        <div className={css.weatherDataItem}>
          <img src={humidity} alt="humidity" />
          <span className={css.humidity}>{weather.humidity}%</span>
        </div>
        <div className={css.weatherDataItem}>
          <img src={pressure} alt="pressure" />
          <span className={css.pressure}>{weather.pressureMB} мм</span>
        </div>
      </div>
      <WeatherList today={days[0]} tomorrow={days[1]} sliceArrCount={8} />
    </div>
  );
};

export default CurrentWeather;

CurrentWeather.propTypes = {
  weather: object,
  days: arrayOf(oneOfType([object])),
  location: object,
};
