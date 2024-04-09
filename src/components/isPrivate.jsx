// src/components/IsPrivate.jsx

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import IsLoading from "./IsLoading";

function IsPrivate({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  // If the authentication is still loading
  <IsLoading />;
  if (!isLoggedIn) {
    // If the user is not logged in
    return <Navigate to="/login" />;
  } else {
    // If the user is logged in, allow to see the page
    return children;
  }
  
}

export default IsPrivate;
