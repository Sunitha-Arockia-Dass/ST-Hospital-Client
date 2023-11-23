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

        
        <input type="password" name="password" placeholder="Enter Password" />
        <span className="form-error-msg"></span><br />

        <button id="login" type="submit">Log In</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
    </div>
  )
}

export default LogIn
