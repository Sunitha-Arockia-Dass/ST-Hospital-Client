import { NavLink , useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./../../context/auth.context";

const API_URL = "http://localhost:5005"

function EditAccount() {
  const { user ,logOutUser} = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
    const updateUser = (e) => {
        e.preventDefault();
        let data = {
          name: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
          newPassword: e.target.newPassword.value,
          role:user.role,
        };
        console.log("data",data);
        axios
          .put(`${API_URL}/patient/update/${user._id}`, data)
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
        <>        
        <div id="editaccount">
            
            <h2>Edit Account</h2>

            <form onSubmit={updateUser}>
                <label>Username</label>
                <input type="text" name="username" defaultValue={user.username} />

                <label>Email</label>
                <input type="text" name="email" defaultValue={user.email} />

                <label> Current Password</label>
                <input type="password" name="password" placeholder="Your password" />

                <label> New Password</label>
                <input type="password" name="newPassword" placeholder="Your new password" />

                <button type="submit"><span>Edit Account</span></button>
            </form>
        </div>
        </>
    )
}

export default EditAccount