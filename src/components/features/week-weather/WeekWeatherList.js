import css from "./WeekWeather.module.scss";
import { getMonthCutName, getCutWeekDay } from "@helpers/helpers.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Link, useSearchParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";

// CДЕЛАТЬ WEEKWEATHERITEM
// LINK TO DAY DATA AFTER CLICK

const WeekWeatherList = ({ days }) => {
  const md = new Date().getDate();
  const nmd = new Date(days[0].date).getDate();

  const dayTab = days.map((el, i) => {
    let WD = getCutWeekDay(new Date(el.date).getDay());
    let MD = new Date(el.date).getDate();
    const M = getMonthCutName(new Date(el.date).getMonth());

    if (md !== nmd) {
      WD = getCutWeekDay(new Date(el.date).getDay() - 1);
      MD = +MD - 1;
    }

    let [searchParams, setSearchParams] = useSearchParams();
    const handleClick = (dataId) => {
      setSearchParams(dataId);
    };

    const styleWeekend =
      WD === "Сб" || WD === "Вс" ? { color: "red" } : undefined;

    return (
      <SwiperSlide className={css.swiperItem} key={el.date + i}>
        <Link
          // to={`/TenDaysWeather?${searchParams}`}
          to={`/TenDaysWeather/#${el.date + i}`}
          onClick={() => handleClick(el.date)}
        >
          <li className={css.item}>
            <h3 className={css.weekDay} style={styleWeekend}>
              {md === MD ? "Сегодня" : WD}
            </h3>
            <div className={css.dayMonth}>
              <span className={css.day}>{MD}</span>
              <span className={css.month}>{M}</span>
            </div>
            <div className={css.iconWrapper}>
              <img src={el.day.conditionIcon} alt="condition-icon" />
            </div>
            <div className={css.temp}>
              <span>{el.day.maxTemp}</span>
              <span>{el.day.minTemp}</span>
            </div>
            <div className={css.conditionText}>{el.day.conditionText}</div>
          </li>
        </Link>
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={7}
      scrollbar={{ draggable: true }}
      navigation
      className={css.list}
    >
      <ul className={css.list}>{dayTab}</ul>
    </Swiper>
  );
};

export default WeekWeatherList;
