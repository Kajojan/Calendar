import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  user_firstName: "",
  user_lastName: "",
  user_email: "",
  user_password: ""
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Add: (state, action) => {
      state.user_id = action.payload.id
      state.user_firstName = action.payload.firstName
      state.user_lastName = action.payload.lastName
      state.user_email = action.payload.email
      state.user_password = action.payload.password
    }
  },
});

export const {Add} = UserSlice.actions;

export default UserSlice.reducer;
