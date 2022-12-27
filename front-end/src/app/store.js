import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import MonthReducer from '../features/MonthSlice';
import YearSlice from '../features/YearSlice';
import CurrentDaySlice from '../features/CurrentDaySlice'
import CalSlice from '../features/CalSlice';
import UserSlice from '../features/UserSlice'
import AllcalSlice from '../features/AllcallSlice';

 const store = configureStore({
  reducer:{
    month: MonthReducer,
    year: YearSlice,
    day: CurrentDaySlice,
    cal: CalSlice,
    user: UserSlice,
    allcal: AllcalSlice

  }
});
export default store