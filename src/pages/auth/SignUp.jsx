import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../links/links.json";
import { useEffect, useState } from "react";

function SignUp() {
  //   const [user, setUser] = useState()
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [gpData, setGPData] = useState();
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();
    let data = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      patientDetails: {
        dateOfBirth: e.target.dateOfBirth.value,
        gp: e.target.gp.value,
        contactNumber: e.target.phone.value,
        address: {
          houseNumber: e.target.houseNumber.value,
          streetName: e.target.street.value,
          city: e.target.city.value,
          country: e.target.country.value,
          postalCode: e.target.postalCode.value,
        },
      },
    };
    console.log(data);
    axios
      .post(URL.signup, data)
      .then((response) => {
        console.log("Signed up successfully");
        console.log(response.data.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  };
  // const addAdmin = () => {
  //   let data = {
  //     name: "admin",
  //     email: "admin@admin.com",
  //     password: "sthospital123",
  //     role: "admin",
  //   }
  //   console.log(data)
  //   axios
  //     .post(`${API_URL}/auth/signup`, data)
  //     .then((response) => {
  //       console.log("Signed up successfully")
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  // Inputs Validation and user error messages

  //store error messages
  const [errorsInput, setErrorsInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    axios.get(URL.gPractice).then((response) => {
      setGPData(response.data);
    });
  }, []);

  useEffect(() => {
    if (!formInput.username) {
      errorsInput.username = "Username is required";
    }
    if (formInput.username) {
      errorsInput.username = "";
    }
  }, [formInput.username]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // submit if no errors
  const handlesubmit = (e) => {
    console.log(errorsInput.length);
    if (errorsInput.length === 0) {
      signup(e);
    }
  };

  // //check input changes
  // const handleChange = (e) => {
  //   const name = e.target.name
  //   const value =
  //     e.target.type === "checkbox" ? e.target.checked : e.target.value
  //   setFormInput({
  //     ...formInput,
  //     [name]: value
  //   })

  //   // check validity of inputs
  //   if (!formInput.username) {
  //     errorsInput.username = "Username is required"
  //   }

  //   if (!formInput.email) {
  //     errorsInput.email = "Email is required"
  //   }

  //   if (!formInput.password) {
  //     errorsInput.password = "Password is required"
  //   }

  //   if (formInput.confirmPassword  != formInput.password) {
  //     errorsInput.confirmPassword = "Password confirmation is required"
  //   }
  //   //   if (formInput.username.length < 5) {
  //   //   errorsInput.username = "Username must be at least 5 characters long"
  //   //   }
  //   //   const emailRegex = /^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  //   //   if (!emailRegex.test(formInput.email)) {
  //   //      errorsInput.email = "Email is invalid"
  //   //    }
  //   //    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
  //   //    if (!passwordRegex.test(formInput.password)) {
  //   //      errorsInput.password = "Password must be 6 characters long with at least 1 Uppercase and 1 special character"
  //   //    }

  //   //    if (formInput.confirmPassword !== formInput.password) {
  //   //      errorsInput.confirmPassword = "Passwords do not match"
  //   //    }
  // }

  return (
    <div id="signup">
      <form onSubmit={signup}>
        <h3>Sign Up</h3>
        <p>
          Already registered ?
          <NavLink to="/login" className="style-one">
            login
          </NavLink>
        </p>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formInput.username}
          onChange={handleChange}
        />
        <span className="form-error-msg">{errorsInput.username}</span>
        <br />

        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={formInput.email}
          onChange={handleChange}
        />
        <span className="form-error-msg">{errorsInput.email}</span>
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formInput.password}
          onChange={handleChange}
        />
        <span className="form-error-msg">{errorsInput.password}</span>
        <br />

        <input
          type="Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formInput.confirmPassword}
          onChange={handleChange}
        />
        <span className="form-error-msg">{errorsInput.confirmPassword}</span>
        <br />
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
        />
        <br />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Enter your date of birth"
        />
        <br />
        <input
          type="text"
          name="firstname"
          placeholder="Enter your First Name"
        />
        <br />
        <input type="text" name="lastname" placeholder="Enter your Last Name" />
        <br />
        <select name="gp">
          <option value="" disabled hidden>
            Select a General Practice
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
          placeholder="Enter your house number"
        />
        <br />
        <input type="text" name="street" placeholder="Enter your street name" />
        <br />
        <input
          type="text"
          name="postalCode"
          placeholder="Enter your post code"
        />
        <br />
        <input type="text" name="city" placeholder="Enter your city" />
        <br />
        <input type="text" name="country" placeholder="Enter your country" />
        <br />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="server-error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignUp;
