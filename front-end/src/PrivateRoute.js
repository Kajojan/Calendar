import { Route, Redirect, useNavigate, Link} from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import NotLogin from './componets/NotLogin';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  console.log(keycloak.authenticated)

  if (keycloak.authenticated) {
    return children
  } else {
    return <NotLogin/>
  }
};

export default PrivateRoute;
