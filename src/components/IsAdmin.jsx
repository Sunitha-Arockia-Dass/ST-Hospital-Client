import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import IsLoading from "./IsLoading";

function IsAdmin({ children }) {
  const { user } = useContext(AuthContext);

  // If the authentication is still loading
  <IsLoading />;

  if (user.role !== "admin") {
    // If the user is not logged in
    return <Navigate to="/" />;
  } else {
    // If the user is logged in, allow to see the page
    return children;
  }
}

export default IsAdmin;
