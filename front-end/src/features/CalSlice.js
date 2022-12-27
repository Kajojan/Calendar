import { createSlice } from '@reduxjs/toolkit'
import { calendar } from './cal';




const initialState = {
    cal:calendar("2022")
}

const CalSlice = createSlice({
    
  name: "Cal",
  initialState,
  reducers: {
    change:(state,action)=>{
        state.cal=action.payload
    }
  }
});

export const action = CalSlice.actions

export default CalSlice.reducer