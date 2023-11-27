import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import URL from "../../links/links.json";
import { AuthContext } from "./../../context/auth.context";

function EditAccount() {
  const { user, logOutUser } = useContext(AuthContext);
  const [gpData, setGPData] = useState();
  const [myGPData, setMyGPData] = useState();

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(URL.gPractice).then((response) => {
      setGPData(response.data);
    });
  }, []);
  useEffect(() => {
    if(user.patientDetails){
    axios
      .get(`${URL.gPractice}/${user.patientDetails.gp[0]._id}`)
      .then((response) => {
        console.log(response.data);
        setMyGPData(response.data);
      })
      .catch((error) => console.log("error", error));
    }
  }, [user.patientDetails]);
  const updateUser = (e) => {
    e.preventDefault();
    let data = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      newPassword: e.target.newPassword.value,
      role: user.role,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
    }
    if(e.target.dateOfBirth.value.trim()!== ''){
      data.patientDetails.dateOfBirth=e.target.dateOfBirth.value
    }
    if(e.target.gp.value.trim()!== ''){
      data.patientDetails.gp=e.target.gp.value
    }
    if(e.target.phone.value.trim()!== ''){
      data.patientDetails.contactNumber=e.target.phone.value
    }
    if(e.target.houseNumber.value.trim()!== ''){
      data.patientDetails.houseNumber=e.target.houseNumber.value
    }
    if(e.target.street.value.trim()!== ''){
      data.patientDetails.street=e.target.street.value
    }
    if(e.target.city.value.trim()!== ''){
      data.patientDetails.city=e.target.city.value
    }
    if(e.target.country.value.trim()!== ''){
      data.patientDetails.country=e.target.country.value
    }
    if(e.target.postalCode.value.trim()!== ''){
      data.patientDetails.postalCode=e.target.postalCode.value
    }  
    console.log("data", data);
    axios
      .put(`${URL.patientUpdate}/${user._id}`, data)
      .then((response) => {
        logOutUser();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  return (
    <div id="editaccount" className="center">
      <form onSubmit={updateUser}>
        <h3>Edit Account</h3>
        <p>
          Wanna go back ?
          <NavLink to="/account" className="style-one">
            {" "}
            account
          </NavLink>
        </p>

        <input
          type="text"
          name="username"
          defaultValue={user.username}
          placeholder="Enter Username"
        />
        <span className="form-error-msg"></span>
        <br />

        <input
          type="text"
          name="email"
          defaultValue={user.email}
          placeholder="Enter Email"
        />
        <span className="form-error-msg"></span>
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Old Password"
        />
        <span className="form-error-msg"></span>
        <br />

        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
        />
        <span className="form-error-msg"></span>
        <br />
        <input
          type="tel"
          name="phone"
          defaultValue={user.patientDetails?.contactNumber}
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
        />
        <br />
        <input
          type="date"
          name="dateOfBirth"
          defaultValue={user.patientDetails?.dateOfBirth}
          placeholder="Enter your date of birth"
        />
        <br />
        <input
          type="text"
          name="firstname"
          defaultValue={user.firstname}
          placeholder="Enter your First Name"
        />
        <br />
        <input
          type="text"
          name="lastname"
          defaultValue={user.lastname}
          placeholder="Enter your Last Name"
        />
        <br />
        <select name="gp">
        <option value="" disabled selected>
    {myGPData?.name}
  </option>

          {gpData?.map((gp) => {
            return (
              <option key={gp._id} value={gp._id}>
                {gp.name}, {gp.address.city}
              </option>
            );
          })}
        </select>
        <br />
        <input
          type="text"
          name="houseNumber"
          defaultValue={user.patientDetails?.address.houseNumber}
          placeholder="Enter your house number"
        />
        <br />
        <input
          type="text"
          name="street"
          defaultValue={user.patientDetails?.address.street}
          placeholder="Enter your street name"
        />
        <br />
        <input
          type="text"
          name="postalCode"
          defaultValue={user.patientDetails?.address.postalCode}
          placeholder="Enter your post code"
        />
        <br />
        <input
          type="text"
          name="city"
          defaultValue={user.patientDetails?.address.city}
          placeholder="Enter your city"
        />
        <br />
        <input
          type="text"
          name="country"
          defaultValue={user.patientDetails?.address.country}
          placeholder="Enter your country"
        />
        <br />
        <button type="submit">Edit Account</button>
      </form>
    </div>
  );
}

export default EditAccount;
