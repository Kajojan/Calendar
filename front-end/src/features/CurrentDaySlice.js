import { createSlice } from "@reduxjs/toolkit";

const CurrentDaySlice = createSlice({
  name: "Day",
  initialState: {
    currentDay: 0,
    dayData: {},
  },
  reducers: {
    change: (state, action) => {
      state.currentDay = action.payload;
    },
    changeData: (state, action) => {
      state.dayData = action.payload;
      console.log(action.payload)
    }
  },
});

export const actions = CurrentDaySlice.actions;

export default CurrentDaySlice.reducer;
