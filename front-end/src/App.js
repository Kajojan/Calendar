import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import CurrentDay from "./componets/mainCallendar/CurrentDay";
import Calendar from "./componets/mainCallendar/Calendar";
import Navi from "./componets/Navi/Navi";
import MainPage from "./componets/MainPage";
import Login from "./componets/Login";
import Profile from "./componets/Navi/Profile";
import Callendars from "./componets/Navi/Callendars";
import Notice from "./componets/Navi/Notice";
import Settings from "./componets/Navi/Settings";
import SingUp from "./componets/SingUp";
import {fetchData} from '../src/features/CalSlice'

function App() {
  const dispatch = useDispatch()
  const currentMonth = useSelector((state) => state.month.currentMonth);
  const currentYear = useSelector((state) => state.year.currentYear);
  const user = useSelector((state) => state.user.user_id);
  useEffect(() => {
      dispatch(fetchData("2"))
  }, []);
 
  return (
    <div className="App">
      <Navi />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path={`/profile${user}`} element={<Profile />} />
        <Route path="/Callendars" element={<Callendars />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/singup" element={<SingUp />} />
        <Route
          path={`/callander/${user}/${currentYear}/${currentMonth}/:currentday`}
          element={<CurrentDay />}
        />
        <Route
          path={`/callander/${user}/${currentYear}/${currentMonth}`}
          element={<Calendar />}
        />
      </Routes>
    </div>
  );
}

export default App;
