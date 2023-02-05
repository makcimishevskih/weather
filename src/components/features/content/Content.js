import css from "./Content.module.scss";

import { useSelector } from "react-redux";

import Map from "@features/map";
import WeekWeather from "@features/week-weather";
import CurrentWeather from "@features/current-weather";
import Info from "@features/info";
import InfoPerDay from "@features/info-per-day";

const Content = () => {
  const { weather, days, astro, city, district, citys } = useSelector(
    (state) => state.weather
  );

  return (
    <section className={css.content}>
      <div className="container">
        <div className={css.weatherToday}>
          <CurrentWeather
            weather={weather}
            days={days}
            location={{ city, district }}
          />
          {/* <Map width="500px" height="300px" /> */}
        </div>

        <WeekWeather weather={weather} days={days} />

        <Info astro={astro} citys={citys} />

        <InfoPerDay days={days} />
      </div>
    </section>
  );
};

export default Content;
