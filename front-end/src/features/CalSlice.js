import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { calendar } from "./cal";
import { Add } from "./UserSlice";

const initialState = {
  cal: [],
  cal_id: 0,
  Allcall: [],
};

const CalSlice = createSlice({
  name: "Cal",
  initialState,
  reducers: {
    changeCal: (state, action) => {
      state.cal = action.payload.cal;
      state.cal_id = action.payload.cal_id;
    },
    fetchCal: (state, action) => {
      state.cal = action.payload;
    },
    add: (state, action) => {
      state.Allcall.push(action.payload);
      console.log(state.Allcall, action.payload);
    },
    upload: (state, action) => {
      state.Allcall = action.payload;
    },
  },
});

export const fetchData = (user_id) => async (dispatch, getState) => {
  const cals = await axios.get(`http://localhost:4000/api/cal/${user_id}/`);
  dispatch(fetchCal(cals.data[0].callendars[0].cal));
};

export const postData = (user_id) => {
  const data = calendar();
  return (dispatch) => {
    axios
      .put(`http://localhost:4000/api/cal/${user_id}`, { cal: data })
      .then((response) => {
        dispatch({ type: "POST_SUCCESS", data: response.data });
        dispatch(changeCal({ cal: data, cal_id: response.data.cal_id }));
        dispatch(add(data));
      })
      .catch((error) => {
        dispatch({ type: "POST_ERROR", error });
      });
  };
};

export const postEvent = (user_id, cal_id, month_id, day_id, data) => {
  return (dispatch) => {
    axios
      .put(
        `http://localhost:4000/api/cal/${user_id}/${cal_id}/${month_id}/${day_id}`,
        data
      )
      .then((response) => {
        dispatch({ type: "POST_SUCCESS", data: response.data });
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
      `http://localhost:4000/api/cal/${user_id}/${cal_id}/${month_id}/${day_id}/${event_id}`,
    )
    .then((response) => {
      dispatch({ type: "POST_SUCCESS", data: response.data });
    })
    .catch((error) => {
      dispatch({ type: "POST_ERROR", error });
    });
  }
}

export const { changeCal, fetchCal, add, upload } = CalSlice.actions;

export default CalSlice.reducer;
