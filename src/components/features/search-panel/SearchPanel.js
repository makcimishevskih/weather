import css from "./SearchPanel.module.scss";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchAPI } from "@services/fetch.js";
import { coordsActions } from "@redux/slices/coordsSlice.js";
import { weatherActions } from "@redux/slices/weatherSlice.js";

import useInput from "@hooks/useInput.js";

import Input from "@features/input";

const SearchPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();
  const [cityName, resetCityName, handlers] = useInput("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSearchParams({ lat: "", lon: "" });

    fetchAPI.fetchCurrentWeather(cityName)
      .then((data) => {
        setSearchParams({ lat: data.latitude, lon: data.longitude });
        dispatch(coordsActions.getCoords([data.latitude, data.longitude]));
        dispatch(weatherActions.changeCity(data.city));
        navigate(`/?lat=${data.latitude}&lon=${data.longitude}`);
        resetCityName("");
      })
      .catch(() => {
        navigate(`/notFoundPage/?lat=&lon=`);
      });
  };

  return (
    <form onSubmit={handleOnSubmit} className={css.searchForm}>
      <Input
        value={cityName}
        error={error}
        placeholder="Введите название города"
        {...handlers}
      />
    </form>
  );
};

export default SearchPanel;
