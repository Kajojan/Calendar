import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user_id: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
  check: false,
  error: ""
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Add: (state, action) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.firstName;
      state.lastname = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    checkUser: (state, action) => {
      state.check = action.payload;
    },
    error:(state,action)=>{
      state.error = action.payload
    }

  },
});

export const postData = (data) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:4000/api/cal/`, { ...data, callendars: [] })
      .then((response) => {
        if(response.data.status != "error"){
          dispatch(error(""))
          dispatch(Add(data))
          dispatch(checkUser(true));
        }else{
          dispatch(error(response.data.error))
          dispatch(checkUser(false));
        }
      })
      .catch((error) => {
        dispatch(checkUser(false));
      });
  };
};

export const { Add , checkUser, error} = UserSlice.actions;

export default UserSlice.reducer;
