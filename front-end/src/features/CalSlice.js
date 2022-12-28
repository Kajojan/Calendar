import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { calendar } from "./cal";

const initialState = {
  cal: [],
};

const CalSlice = createSlice({
  name: "Cal",
  initialState,
  reducers: {
    change: (state, action) => {
      state.cal = action.payload;
    },
    fetchCal: (state, action) => {
      state.cal = action.payload;
    },

  },
});

export const fetchData = (user_id) => async (dispatch, getState) => {
  const cals = await axios.get(`http://localhost:4000/api/cal/${user_id}/`);
  dispatch(action.fetchCal(cals.data[0].callendars[0].cal));
};

export const postData=(user_id) =>{
  const data = calendar()
  console.log(data)
  return (dispatch) => {
    axios
      .put(`http://localhost:4000/api/cal/${user_id}`, {"cal":data})
      .then((response) => {
        dispatch({ type: "POST_SUCCESS", data: response.data });
      })
      .catch((error) => {
        dispatch({ type: "POST_ERROR", error });
      });
  };
}

export const action = CalSlice.actions;

export default CalSlice.reducer;
