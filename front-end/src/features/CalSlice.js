import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { calendar } from "./cal";
import { Add } from "./UserSlice";

const initialState = {
  cal: [],
  cal_id: 0,
  Allcall: [],
  error: false
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
    error:(state, action)=>{
      state.error = action.payload
    }
  },
});

export const fetchData = (user_id) => async (dispatch, getState) => {
  const cals = await axios.get(`http://localhost:4000/api/cal/${user_id}/`);
  dispatch(fetchCal(cals.data[0].callendars[0].cal));
};

export const postData = (user_id,data=calendar(user_id)) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:4000/api/cal/${user_id}`, { cal: data })
      .then((response) => {
        if(response.data.status != "error"){
          console.log(response)
          dispatch(changeCal({ cal: data, cal_id: response.data.cal_id }));
          dispatch(add(data));
          dispatch(error(false))

        }else{
          dispatch(error(response.data.error))

        }
      })
      .catch((error) => {
        dispatch({ type: "POST_ERROR", error });
      });
  };
};



export const { changeCal, fetchCal, add, upload, error } = CalSlice.actions;

export default CalSlice.reducer;
