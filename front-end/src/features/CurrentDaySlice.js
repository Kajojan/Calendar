import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { add, changeCal, upload } from "./CalSlice";


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
  return ( dispatch) => {
    axios
      .put(
        `http://localhost:4000/api/cal/${user_id}/${cal_id}/${month_id}/${day_id}`,
        data
      )
      .then((response) => {
          console.log(response.data)
        dispatch(actions.changeData(response.data.event.cal[month_id][day_id]));
        dispatch(changeCal({cal: response.data.event}))
        dispatch(upload(response.data.allcal[0].callendars))
        
      })
      .catch((error) => {
        dispatch({ type: "POST_ERROR", error });
      });
  };
};

export const dellevent = (user_id, cal_id, month_id, day_id, event_id) =>{
  console.log(cal_id)
  return (dispatch) =>{
    axios
    .delete(
      `http://localhost:4000/api/cal/${user_id}/${cal_id}/${month_id}/${day_id-1}/${event_id}`,
    )
    .then((response) => {
    console.log(response.data)
    dispatch(actions.changeData(response.data.event.cal[month_id][day_id-1]));
    dispatch(changeCal({cal: response.data.event}))
    dispatch(upload(response.data.allcal[0].callendars))
    
  })
    .catch((error) => {
      dispatch({ type: "POST_ERROR", error });
    });
  }
}
export const actions = CurrentDaySlice.actions;

export default CurrentDaySlice.reducer;
