import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user_id: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Add: (state, action) => {
      state.user_id = action.payload.user_id
      state.name = action.payload.firstName
      state.lastname = action.payload.lastName
      state.email = action.payload.email
      state.password = action.payload.password
      state.check = true
    },
    checkUser: (state, action) =>{
      state.check = action.payload
    }
  },
});


export const postData=(data) =>{
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/api/cal/`, {...data, 'callendars': []})
      .then((response) => {
        dispatch({ type: "POST_SUCCESS", data: response.data });
      })
      .catch((error) => {
        dispatch({ type: "POST_ERROR", error });
      });
  };
}



export const {Add} = UserSlice.actions;

export default UserSlice.reducer;
