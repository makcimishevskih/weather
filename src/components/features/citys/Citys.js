import css from "./Citys.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "@redux/slices/weatherSlice.js";
import { coordsActions } from "@redux/slices/coordsSlice.js";
import { fetchAPI } from "@services/fetch";
import { useSearchParams } from "react-router-dom";

const Citys = () => {
  const { citysWeather } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (city) => {
    fetchAPI
      .fetchCurrentWeather(city)
      .then((data) => {
        dispatch(weatherActions.changeCity(data.city));
        dispatch(coordsActions.getCoords([data.latitude, data.longitude]));
        setSearchParams({ lat: data.latitude, lon: data.longitude });
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
