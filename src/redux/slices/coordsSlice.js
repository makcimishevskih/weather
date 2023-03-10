import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: 55.763908,
  longitude: 37.60646,
};

export const coordsSlice = createSlice({
  name: "coords",
  initialState,
  reducers: {
    getCoords: (state, { payload }) => {
      state.latitude = payload[0];
      state.longitude = payload[1];
    },
  },
});

export const coordsActions = coordsSlice.actions;

export default coordsSlice.reducer;
