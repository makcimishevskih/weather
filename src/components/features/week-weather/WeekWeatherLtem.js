import css from "./WeekWeather.module.scss";

const WeekWeatherListItem = () => {
  return (
    <li className={css.item} key={el.date}>
      <h3 className={css.weekDay}>{md === MD ? "Сегодня" : WD}</h3>
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
  );
};

export default WeekWeatherListItem;
