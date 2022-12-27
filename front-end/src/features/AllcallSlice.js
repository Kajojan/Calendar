import { createSlice } from "@reduxjs/toolkit";

const AllcalSlice = createSlice({
  name: "AllcalSlice",
  initialState: {
    Allcall: [],
  },
  reducers: {
    add: (state, action) => {
      state.Allcall.push(action.payload)
    },
  },
});

export const actions = AllcalSlice.actions;

export default AllcalSlice.reducer;
