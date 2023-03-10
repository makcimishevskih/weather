import css from "./TenDaysWeather.module.scss";

import tenDays from "@icons/tenDays.png";

import { memo } from "react";
import { useSelector } from "react-redux";

import InfoPerDay from "@features/info-per-day";

const TenDaysWeather = memo(() => {
  const { city, district, days } = useSelector((state) => state.weather);

  return (
    <div className={css.tenDaysWeather}>
      <div className="container">
        <header className={css.header}>
          <img className={css.tenDaysIcon} src={tenDays} alt="icon" />
          <h2 className={css.title}>
            Погода на 10 дней - {city}
            {district ? `, ${district}` : ""}
          </h2>
        </header>
        <InfoPerDay days={days} />
      </div>
    </div>
  );
});

export default TenDaysWeather;
