import { NavLink } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";


function LogIn() {
    // const [user, setUser] = useState();
    const login = (e) => {
        e.preventDefault();
        let data = {
          name: e.target.username.value,
          password: e.target.password.value,
        };
        console.log(data);
        axios
          .post("http://localhost:5005/auth/login", data)
          .then((response) => {
            console.log("logged in up successfully");
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };


    return (
        <div id="login">
            <h2>Log In</h2>
            <p>Need an account first ?
                <NavLink to="/signup">signup</NavLink>
            </p>

            <form onSubmit={login}>
                <label>Username</label>
                <input type="username" name="username" placeholder="" />
                
                <label>Password</label>
                <input type="password" name="password" placeholder="" />
                
                <button id="login" type="submit"><span>Log In</span></button>
            </form>

        </div>
    )
}

export default LogIn