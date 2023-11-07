import { NavLink } from "react-router-dom"

function LogIn() {
    return (
        <div id="login">
            <h2>Log In</h2>
            <p>Need an account first ?
                <NavLink to="/signup">signup</NavLink>
            </p>

            <form action="/login" method="POST">
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