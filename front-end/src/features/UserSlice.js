import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user_id: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
  check: false,
  error: "",
  raportChange: undefined,
  mod: true
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Add: (state, action) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    checkUser: (state, action) => {
      state.check = action.payload;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
    modChange: (state, action) => {
      state.mod = action.payload
    },
    raportChange: (state, action) => {
      state.raportChange = action.payload;
    },
  },
});

export const postData = (data) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:31201/api/cal/`, { ...data, callendars: [] })
      .then((response) => {
        console.log(response)
        if (response.data.status != "error") {
          dispatch(error(""));
          dispatch(Add(data));
          dispatch(checkUser(true));
        } else {
          dispatch(error(response.data.error));
          dispatch(checkUser(false));
        }
      })
      .catch((error) => {
        dispatch(checkUser(false));
      });
  };
};

export const raport = (user_id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:31201/api/cal/do/a/raport/${user_id}`)
      .then((response) => {
        dispatch(raportChange(response.data));
      })
      .catch((error) => {
        dispatch(checkUser(false));
      });
  };
};

export const { Add, checkUser, error, raportChange, modChange } = UserSlice.actions;

export default UserSlice.reducer;
