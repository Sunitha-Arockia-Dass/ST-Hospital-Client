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
      
    };
    axios
      .post(URL.signup, data)
      .then((response) => {
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
      navigate("/login");
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
    })
    .catch(error=>{
      setErrorMessage(error.response.data.message);
    })
  }, []);

  useEffect(() => {
    if (!formInput.username) {
      errorsInput.username = "";
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

  
  // //check input changes
  // submit if no errors
  // const handlesubmit = (e) => {
  //   console.log(errorsInput.length);
  //   if (errorsInput.length === 0) {
  //     signup(e);
  //   }
  // };
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
          <div className="two-inputs">
            <input
              type="text"
              name="firstname"
              placeholder="Enter your First Name"
            />
            <input type="text"
              name="lastname"
              placeholder="Enter your Last Name" />
          </div>

          <br />
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
            <svg onClick={revealPassword} className="eye" fill="black" width="32px" height="32px" viewBox="0 0 32.00 32.00"><path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z"></path></svg>
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


          <button className="form" type="submit">Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUp;
