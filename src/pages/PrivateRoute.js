import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // If the user is logged in present them with a route for logged in users, otherwise present them with the standard view
  return user ? <Outlet /> : <Navigate to={`/?redirectTo=${encodeURI(location.pathname)}`} />;
};

export default PrivateRoute;
