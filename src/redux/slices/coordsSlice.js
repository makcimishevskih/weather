import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: null, // 0
  longitude: null, // 0
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
