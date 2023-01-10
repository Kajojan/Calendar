import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { calendar } from "./cal";
import { Add } from "./UserSlice";

const initialState = {
  cal: [],
  cal_id: 0,
  Allcall: [],
  error: {status: true , data: ""}
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
    },
    upload: (state, action) => {
      state.Allcall = action.payload;
    },
    error:(state, action)=>{
      state.error = action.payload
    },
    addUser:(state,action)=>{
      state.cal[0].users = (action.payload)
    }
  },
});

export const fetchData = (user_id) => async (dispatch, getState) => {
  const cals = await axios.get(`http://localhost:4000/api/cal/${user_id}/`);
  dispatch(fetchCal(cals.data[0].callendars[0].cal));
};

export const postData = (user_id,data=calendar(user_id),seUser_id=null, cal_id = null) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:4000/api/cal/${user_id}`, { seUser_id:seUser_id, seUsersCal_id: cal_id , cal: data })
      .then((response) => {
        if(response.data.status != "error"){
          if(seUser_id == null){
            dispatch(changeCal({ cal: data, cal_id: response.data.cal_id }));
            dispatch(add(data));
          }
          dispatch(addUser(data[0].users))
          dispatch(error({status: false, data:""}))
        }else{
          dispatch(error({status: true, data: response.data.error}))

        }
      })
      .catch((error) => {
        dispatch({ type: "POST_ERROR", error });
      });
  };
};



export const { changeCal, fetchCal, add, upload, error,addUser } = CalSlice.actions;

export default CalSlice.reducer;
