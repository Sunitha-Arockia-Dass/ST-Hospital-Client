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
          street: e.target.street.value,
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
      console(response.data)
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


  /*show password */
  const revealPassword = () => {
    const password = document.getElementById("passwordInput")

    if (password.type === "password") {
      password.type = "text"      
    } else {
      password.type = "password"
    }
  }

  return (
    <div id="signup" className="full center-frame">
      <div className="half-frame">
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

          <div className="password">
          <input id="passwordInput"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formInput.password}
            onChange={handleChange}
          />
          <svg  onClick={revealPassword} className="eye" fill="black" width="32px" height="32px" viewBox="0 0 32.00 32.00"><path d="M16.108 10.044c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.686 6-6-2.686-6-6-6zM16.108 20.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.748 4.044-3.954 4.044zM31.99 15.768c-0.012-0.050-0.006-0.104-0.021-0.153-0.006-0.021-0.020-0.033-0.027-0.051-0.011-0.028-0.008-0.062-0.023-0.089-2.909-6.66-9.177-10.492-15.857-10.492s-13.074 3.826-15.984 10.486c-0.012 0.028-0.010 0.057-0.021 0.089-0.007 0.020-0.021 0.030-0.028 0.049-0.015 0.050-0.009 0.103-0.019 0.154-0.018 0.090-0.035 0.178-0.035 0.269s0.017 0.177 0.035 0.268c0.010 0.050 0.003 0.105 0.019 0.152 0.006 0.023 0.021 0.032 0.028 0.052 0.010 0.027 0.008 0.061 0.021 0.089 2.91 6.658 9.242 10.428 15.922 10.428s13.011-3.762 15.92-10.422c0.015-0.029 0.012-0.058 0.023-0.090 0.007-0.017 0.020-0.030 0.026-0.050 0.015-0.049 0.011-0.102 0.021-0.154 0.018-0.090 0.034-0.177 0.034-0.27 0-0.088-0.017-0.175-0.035-0.266zM16 25.019c-5.665 0-11.242-2.986-13.982-8.99 2.714-5.983 8.365-9.047 14.044-9.047 5.678 0 11.203 3.067 13.918 9.053-2.713 5.982-8.301 8.984-13.981 8.984z"></path></svg>
          </div>
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
          <button className="form" type="submit">Sign Up</button>
        </form>

        {errorMessage && <p className="server-error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUp;
