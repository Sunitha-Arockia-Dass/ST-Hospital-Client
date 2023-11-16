import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import URL from '../../links/links.json'
import { AuthContext } from "./../../context/auth.context";

function EditAccount() {
  const { user, logOutUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const updateUser = (e) => {
    e.preventDefault();
    let data = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      newPassword: e.target.newPassword.value,
      role: user.role,
    };
    console.log("data", data);
    axios
      .put(`${URL.patientUpdate}/${user._id}`, data)
      .then((response) => {
        console.log(response.data.data);
        logOutUser()
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error)
      });
  };

  return (

    <div id="editaccount" className="center">
      <form onSubmit={updateUser}>
        <h3>Edit Account</h3>
        <p>
          Wanna go back ?<NavLink to="/account" className="style-one"> account</NavLink>
        </p>

        <input type="text" name="username" defaultValue={user.username} placeholder="Enter Username" />
        <span className="form-error-msg"></span><br />

        <input type="text" name="email" defaultValue={user.email} placeholder="Enter Email" />
        <span className="form-error-msg"></span><br />

        <input type="password" name="password" placeholder="Enter Actual Password" />
        <span className="form-error-msg"></span><br />

        <input type="password" name="newPassword" placeholder="Enter New Password" />
        <span className="form-error-msg"></span><br />

        <button type="submit">Edit Account</button>
      </form>
    </div>

  )
}

export default EditAccount