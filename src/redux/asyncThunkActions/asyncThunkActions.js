import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchAPI } from "utils/services/fetch";

export const fetchCurrentWeatherAction = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (city, thunkAPI) => fetchAPI.fetchCurrentWeather(city)
);

export const fetchAstroAction = createAsyncThunk(
  "weather/fetchAstro",
  async (city, thunkAPI) => fetchAPI.fetchAstro(city)
);

export const fetchForecastAction = createAsyncThunk(
  "weather/fetchForecast",
  async (city) => fetchAPI.fetchForecast(city)
);

export const fetchDistrictsAction = createAsyncThunk(
  "weather/fetchDistrics",
  async (city) => fetchAPI.fetchDistrics(city)
);

export const fetchCitysWeatherAction = createAsyncThunk(
  "weather/fetchCitysWeather",
  async () => fetchAPI.fetchCitysWeather()
);

export const asyncThunks = {
  fetchCurrentWeatherAction,
  fetchAstroAction,
  fetchForecastAction,
  fetchDistrictsAction,
  fetchCitysWeatherAction,
};
