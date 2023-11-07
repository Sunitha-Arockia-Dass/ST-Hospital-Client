import { NavLink } from "react-router-dom"


function Navbar() {

    return (
        <header>

            <nav className="navbar">
                <ul>
                    <NavLink to="/">Home</NavLink>

                    <NavLink to="/signup">Signup</NavLink>

                    <NavLink to="/login">Login</NavLink>

                    <NavLink to="/account">Account</NavLink>

                    <NavLink to="/editaccount">Edit Account</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar