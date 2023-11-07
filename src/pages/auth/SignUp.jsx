import { NavLink } from "react-router-dom"

function SignUp() {
    return (
        <div id="signup">
            <h2>Sign Up</h2>
            <p>Already registered ?
                <NavLink to="/login">login</NavLink>
            </p>

            <form action="/signup" method="POST">

                <label>Username</label>
                <input type="text" name="username" placeholder="" />
                
                <label>Email</label>
                <input type="email" name="email" placeholder="" />
                
                <label>Password</label>
                <input type="password" name="password" placeholder="" />
                
                <button type="submit">Sign Up</button>
            </form>
            
        </div>
    )
}

export default SignUp