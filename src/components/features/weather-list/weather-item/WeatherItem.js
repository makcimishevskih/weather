import css from "./WeatherItem.module.scss";

const WeatherItem = ({ time, condition, temp_c }) => {
  return (
    <div
      style={
        time.slice(time.length - 5, time.length) === "00:00"
          ? {
              borderLeft: "1px solid rgba(0,0,0,0.3)",
              paddingLeft: "15px",
            }
          : null
      }
      className={css.weatherItemTomorow}
    >
      <div className={css.time}>{time.slice(time.length - 5, time.length)}</div>
      <div className={css.conditionImgWrapper}>
        <img src={condition.icon} alt="condition-icon" />
      </div>
      <div className={css.temp}>{Math.round(temp_c)}</div>
    </div>
  );
};

export default WeatherItem;
