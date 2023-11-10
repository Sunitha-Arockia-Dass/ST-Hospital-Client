import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function SignUp() {
//   const [user, setUser] = useState();

  const signup = (e) => {
    e.preventDefault();
    let data = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);
    axios
      .post("http://localhost:5005/auth/signup", data)
      .then((response) => {
        console.log("Signed up successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="signup">
      <h2>Sign Up</h2>
      <p>
        Already registered ?<NavLink to="/login">login</NavLink>
      </p>

      <form onSubmit={signup}>
        <label>Username</label>
        <input type="text" name="username" placeholder="" />

        <label>Email</label>
        <input type="email" name="email" placeholder="" />

        <label>Password</label>
        <input type="password" name="password" placeholder="" />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
