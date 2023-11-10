import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";

function LogIn() {
  // const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    let data = {
      name: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(data);
    axios
      .post(`${API_URL}/auth/login`, data)
      .then((response) => {
        console.log("logged in up successfully");
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  return (
    <div id="login">
      <h2>Log In</h2>
      <p>
        Need an account first ?<NavLink to="/signup">signup</NavLink>
      </p>

      <form onSubmit={login}>
        <label>Username</label>
        <input type="username" name="username" placeholder="" />

        <label>Password</label>
        <input type="password" name="password" placeholder="" />

        <button id="login" type="submit">
          <span>Log In</span>
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LogIn;
