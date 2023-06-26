import { React, useEffect } from "react";
import "../../scss/navi.scss";
import {useSelector, useDispatch } from "react-redux";
import { postData, error } from "../../features/UserSlice";
import {Link, useNavigate} from "react-router-dom"
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { Add } from "../../features/UserSlice";
import { upload } from "../../features/CalSlice";




function Navi() {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();
  const dispatch = useDispatch();
  const usersName = useSelector((state)=>state.user.name)

  const check = async (email,token) => {
    const response = await axios
      .post(`http://localhost:31201/api/cal/1`, {
        email: email,
        token: token
      })
      .then((res) => {
        const { user_id, name, lastname, email, password, callendars } =
          res.data[0];
        dispatch(
          Add({ user_id, name, lastname, email, password, check: true })
        );
        dispatch(upload(callendars));
        return res.data[0];
      });
    return response;
  };

  const oncliockButton = async ()=> {
    
    if (!!keycloak.authenticated){
      
      try {
        const response = await axios.get('http://localhost:8080/auth/realms/Mern/protocol/openid-connect/userinfo', {
          headers: {
            Authorization: 'Bearer ' + keycloak.token,
          },
        });
        const { sub, email, given_name, family_name } = response.data;
        try {
          const data = await check(email,keycloak.token);
          
        } catch (error) {
          dispatch(
            postData({
              user_id: sub,
              name: given_name,
              lastname: family_name,
              email: email,
              password: 'pasword',
              token: keycloak.token
            })
          );
        }
        
    
        
      } catch (error) {
        console.error(error);
      }
    }else{
      const response = await axios
        .get(`http://localhost:31201/api/cal/`)
    }
    
  }
  useEffect(() => {
    oncliockButton()
  });
  return (
    <div className="Navi">
      <div className="Link">
      <Link to="/mainpage"> Home</Link>
      <Link to="/profile"> Profile</Link>
      </div>
      <div><a>Callendar</a></div>
      {/* <div className="Welcome">
      <p>Welcome: {usersName}</p>
      </div> */}
      <div>
                 {!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.login()}
                   >
                     Login
                   </button>
                 )}

                 {!!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.logout()}
                   >
                     Logout ({keycloak.tokenParsed.preferred_username})
                   </button>
                 
                 )} 
        </div>
    
      {/* <Link to="/Notice"> Notice</Link> */}
      {/* <Link to="/Settings"> Settings</Link> */}


      {/* <Profile />
      <Callendars />
      <Notice />
      <Settings /> */}
    </div>
  );
}

export default Navi;
