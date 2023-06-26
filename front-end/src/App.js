import { React, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import CurrentDay from "./componets/mainCallendar/CurrentDay";
import Calendar from "./componets/mainCallendar/Calendar";
import Navi from "./componets/Navi/Navi";
import MainPage from "./componets/MainPage";
import Login from "./componets/Login";
import Profile from "./componets/Navi/Profile";
import Notice from "./componets/Navi/Notice";
import SingUp from "./componets/SingUp";
import keycloak from "./Keycloak";
import axios from "axios";
import { loggedIn } from "./features/LoggedInSlice";
import AllEventCAl from "./componets/AllEventCAl";
import { error, modChange } from "./features/UserSlice";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import PrivateRoute from "./PrivateRoute";
import NotLogin from "./componets/NotLogin";
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentMonth = useSelector((state) => state.month.currentMonth);
  const currentYear = useSelector((state) => state.year.currentYear);
  const user = useSelector((state) => state.user.user_id);
  const logged = useSelector((state) => state.loggedin.loggedin);
  const change = useSelector((state) => state.loggedin.change);
  const dark = useSelector((state) => state.user.mod);
  const mod = localStorage.getItem("mode") == "true";

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className={dark ? "dark-mode" : "light-mode"}>
      <ReactKeycloakProvider authClient={keycloak}>
          <Navi/>
          <div className="BackButton">
            <button onClick={handleClick}>Cofnij</button>
          </div>
          <Routes>

          <Route path={`/mainpage`} element={<PrivateRoute> <MainPage /> </PrivateRoute>} />
        
            <Route
              path={`/callander/${user}/allCal`}
              element={<PrivateRoute>
               <AllEventCAl />
              </PrivateRoute>}
            />
            <Route path={`/profile`} element={<PrivateRoute>
              <Profile />
              </PrivateRoute>} />
            <Route path="/Notice" element={<PrivateRoute>
              <Notice />
              </PrivateRoute>} />
            <Route
              path={`/callander/${user}/${currentYear}/${currentMonth}/:currentday`}
              element={<PrivateRoute>
                <CurrentDay />
                </PrivateRoute>}
            />
            <Route
              path={`/callander/${user}/${currentYear}/${currentMonth}`}
              element={<PrivateRoute>
                <Calendar />
                </PrivateRoute>}
            />
            
          </Routes>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
