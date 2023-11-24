import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import URL from '../../links/links.json'

import { AuthContext } from "./../../context/auth.context"

const API_URL = "http://localhost:5005"

function LogIn() {
  // const [user, setUser] = useState()
  const [errorMessage, setErrorMessage] = useState(undefined)
  const navigate = useNavigate()

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser, user } = useContext(AuthContext)
  const login = (e) => {
    e.preventDefault()
    let data = {
      name: e.target.username.value,
      password: e.target.password.value,
    }
    axios
      .post(URL.login, data)
      .then((response) => {
        storeToken(response.data.authToken)
        authenticateUser()
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage(error)
      })
  }

  /* Reveal password */
  const revealPassword = () => {
    const password = document.getElementById("passwordInput")

    if (password.type === "password") {
      password.type = "text"      
    } else {
      password.type = "password"
    }
  }
  

  return (
    <div id="login" className="full center-frame">
    <div className="half-frame">   
      <form onSubmit={login}>
        <h3>Log In</h3>
        <p>
          Need an account first ?<NavLink to="/signup" className="style-one">signup</NavLink>
        </p>
        
        <input type="username" name="username" placeholder="Enter Username" />
        <span className="form-error-msg"></span><br />

        <div className="password">
        <input id="passwordInput" type="password" name="password" placeholder="Enter Password" />
        <svg  onClick={revealPassword} className="eye" fill="black" width="32px" height="32px" viewBox="0 0 32.00 32.00"><path d="M16.108 10.044c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.686 6-6-2.686-6-6-6zM16.108 20.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.206 0 4 1.794 4 4s-1.748 4.044-3.954 4.044zM31.99 15.768c-0.012-0.050-0.006-0.104-0.021-0.153-0.006-0.021-0.020-0.033-0.027-0.051-0.011-0.028-0.008-0.062-0.023-0.089-2.909-6.66-9.177-10.492-15.857-10.492s-13.074 3.826-15.984 10.486c-0.012 0.028-0.010 0.057-0.021 0.089-0.007 0.020-0.021 0.030-0.028 0.049-0.015 0.050-0.009 0.103-0.019 0.154-0.018 0.090-0.035 0.178-0.035 0.269s0.017 0.177 0.035 0.268c0.010 0.050 0.003 0.105 0.019 0.152 0.006 0.023 0.021 0.032 0.028 0.052 0.010 0.027 0.008 0.061 0.021 0.089 2.91 6.658 9.242 10.428 15.922 10.428s13.011-3.762 15.92-10.422c0.015-0.029 0.012-0.058 0.023-0.090 0.007-0.017 0.020-0.030 0.026-0.050 0.015-0.049 0.011-0.102 0.021-0.154 0.018-0.090 0.034-0.177 0.034-0.27 0-0.088-0.017-0.175-0.035-0.266zM16 25.019c-5.665 0-11.242-2.986-13.982-8.99 2.714-5.983 8.365-9.047 14.044-9.047 5.678 0 11.203 3.067 13.918 9.053-2.713 5.982-8.301 8.984-13.981 8.984z"></path></svg>
        </div>
        <span className="form-error-msg"></span><br />

        <button id="login" className="form" type="submit">Log In</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </div>
  )
}

export default LogIn
