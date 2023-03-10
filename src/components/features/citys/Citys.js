import css from "./Citys.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "@redux/slices/weatherSlice.js";
import { coordsActions } from "@redux/slices/coordsSlice.js";
import { useSearchParams } from "react-router-dom";
import { asyncActions } from "@slices/weatherSlice";

const Citys = () => {
  const { citysWeather } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  let [, setSearchParams] = useSearchParams();

  const handleClick = (city) => {
    dispatch(asyncActions.fetchCurrentWeatherAction(city))
      .then(({ payload: { latitude, longitude } }) => {
        dispatch(weatherActions.changeCity(city));
        dispatch(coordsActions.getCoords([latitude, longitude]));
        setSearchParams({ lat: latitude, lon: longitude });
      })
      .then(() => window.scrollTo(0, 0));
  };

  const items = citysWeather.map(({ temp, city, conditionIcon }) => {
    return (
      <li
        onClick={(e) => {
          e.preventDefault();
          handleClick(city);
        }}
        className={css.cityItem}
        key={city}
      >
        <div className={css.cityTemp}>{temp}</div>
        <div className={css.cityIconWrapper}>
          <img src={conditionIcon} alt="conditionIcon-icon" />
        </div>
        <div className={css.city}>{city}</div>
      </li>
    );
  });

  return (
    <div className={css.weatherAnotherCitys}>
      <h4 className={css.cityTitle}>Погода в других городах России</h4>
      <ul className={css.cityList}>{items}</ul>
    </div>
  );
};

export default Citys;
