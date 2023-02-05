import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "@redux/slices/coordsSlice.js";
import weatherReducer from "@redux/slices/weatherSlice.js";

export const store = configureStore({
  reducer: {
    coords: coordsReducer,
    weather: weatherReducer,
  },
});
