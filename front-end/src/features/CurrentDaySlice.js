import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


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

export const postEvent = (user_id, cal_id, month_id, day_id, data) => {
  return (dispatch) => {
    axios
      .put(
        `http://localhost:4000/api/cal/${user_id}/${cal_id}/${month_id}/${day_id}`,
        data
      )
      .then((response) => {
        dispatch(actions.changeData(response.data[0].calElement3));
        
      })
      .catch((error) => {
        dispatch({ type: "POST_ERROR", error });
      });
  };
};

export const dellevent = (user_id, cal_id, month_id, day_id, event_id) =>{
  return (dispatch) =>{
    axios
    .delete(
      `http://localhost:4000/api/cal/${user_id}/${cal_id}/${month_id}/${day_id-1}/${event_id}`,
    )
    .then((response) => {
      dispatch(actions.changeData(response.data[0].calElement3));
    })
    .catch((error) => {
      dispatch({ type: "POST_ERROR", error });
    });
  }
}
export const actions = CurrentDaySlice.actions;

export default CurrentDaySlice.reducer;
