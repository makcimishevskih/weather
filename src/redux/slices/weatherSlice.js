import { createSlice } from "@reduxjs/toolkit";
import { asyncThunks } from "@redux/asyncThunkActions/asyncThunkActions.js";

const initialState = {
  city: "",
  citys: [],
  citysWeather: [],
  district: "",

  days: [],
  astro: {},
  weather: {},

  loading: "idle",
  error: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    getCity: (state, { payload }) => {
      state.city = payload[0];
      state.district = payload[1];
    },
    changeCity: (state, { payload }) => {
      state.city = payload;
      state.district = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncThunks.fetchCurrentWeatherAction.pending, (state) => {
        state.loading = "loading";
        state.error = "";
      })
      .addCase(
        asyncThunks.fetchCurrentWeatherAction.fulfilled,
        (state, { payload }) => {
          state.loading = "idle";
          state.error = "";
          state.weather = payload;
        }
      )
      .addCase(asyncThunks.fetchCurrentWeatherAction.rejected, (state) => {
        state.loading = "idle";
        state.error = `fetchCurrentWeatherAction rejected`;
      })

      .addCase(asyncThunks.fetchAstroAction.pending, (state) => {
        state.loading = "loading";
        state.error = "";
      })
      .addCase(asyncThunks.fetchAstroAction.fulfilled, (state, { payload }) => {
        state.loading = "idle";
        state.error = "";
        state.astro = payload;
      })
      .addCase(asyncThunks.fetchAstroAction.rejected, (state) => {
        state.loading = "idle";
        state.error = `fetchAstroAction rejected`;
      })

      .addCase(asyncThunks.fetchForecastAction.pending, (state) => {
        state.loading = "loading";
        state.error = "";
      })
      .addCase(
        asyncThunks.fetchForecastAction.fulfilled,
        (state, { payload }) => {
          state.loading = "idle";
          state.error = "";
          state.days = payload;
        }
      )
      .addCase(asyncThunks.fetchForecastAction.rejected, (state) => {
        state.loading = "idle";
        state.error = `fetchForecastAction rejected`;
      })

      .addCase(asyncThunks.fetchDistrictsAction.pending, (state) => {
        state.loading = "loading";
        state.error = "";
      })
      .addCase(
        asyncThunks.fetchDistrictsAction.fulfilled,
        (state, { payload }) => {
          state.loading = "idle";
          state.error = "";
          state.citys = payload;
        }
      )
      .addCase(asyncThunks.fetchDistrictsAction.rejected, (state) => {
        state.loading = "idle";
        state.error = `fetchDistrictsAction rejected`;
      })

      .addCase(asyncThunks.fetchCitysWeatherAction.pending, (state) => {
        state.loading = "loading";
        state.error = "";
      })
      .addCase(
        asyncThunks.fetchCitysWeatherAction.fulfilled,
        (state, { payload }) => {
          state.loading = "idle";
          state.error = "";
          state.citysWeather = payload;
        }
      )
      .addCase(asyncThunks.fetchCitysWeatherAction.rejected, (state) => {
        state.loading = "idle";
        state.error = `fetchCitysWeatherAction rejected`;
      })

      .addCase(asyncThunks.fetchWeatherInitAppAction.pending, (state) => {
        state.loading = "loading";
        state.error = "";
      })
      .addCase(
        asyncThunks.fetchWeatherInitAppAction.fulfilled,
        (state, { payload }) => {
          state.weather = payload[0];
          state.days = payload[1];
          state.astro = payload[2];
          state.citys = payload[3];
          state.citysWeather = payload[4];
          state.loading = "idle";
          state.error = "";
        }
      )
      .addCase(asyncThunks.fetchWeatherInitAppAction.rejected, (state) => {
        state.loading = "idle";
        state.error = `fetchWeatherInitAppAction rejected`;
      })

      .addCase(asyncThunks.fetchGeolocationInitAction.pending, (state) => {
        state.loading = "loading";
        state.error = "";
      })
      .addCase(
        asyncThunks.fetchGeolocationInitAction.fulfilled,
        (state, { payload }) => {
          state.city = payload[0];
          state.district = payload[1];

          state.loading = "idle";
          state.error = "";
        }
      )
      .addCase(asyncThunks.fetchGeolocationInitAction.rejected, (state) => {
        state.loading = "idle";
        state.error = `fetchGeolocationInitAction rejected`;
      });
  },
});

export const asyncActions = {
  ...asyncThunks,
};

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
