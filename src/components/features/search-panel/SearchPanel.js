import css from "./SearchPanel.module.scss";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { coordsActions } from "@redux/slices/coordsSlice.js";
import { weatherActions } from "@redux/slices/weatherSlice.js";
import { asyncActions } from "@slices/weatherSlice";

import useInput from "@hooks/useInput.js";

import Input from "@features/ui/input";

const SearchPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  let [, setSearchParams] = useSearchParams();
  const [cityName, resetCityName, handlers] = useInput("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSearchParams({ lat: "", lon: "" });

    dispatch(asyncActions.fetchCurrentWeatherAction(cityName))
      .then(({ payload: { latitude, longitude, city } }) => {
        dispatch(coordsActions.getCoords([latitude, longitude]));
        dispatch(weatherActions.changeCity(city));
        navigate(`/?lat=${latitude}&lon=${longitude}`);
        resetCityName("");
      })
      .catch(() => {
        navigate(`/not-found-page/?lat=&lon=`);
      });
  };

  return (
    <form onSubmit={handleOnSubmit} className={css.searchForm}>
      <Input
        value={cityName}
        error={error}
        placeholder="Введите город"
        {...handlers}
      />
    </form>
  );
};

export default SearchPanel;
