import { NavLink } from "react-router-dom"


function Navbar() {

    return (
        <header>

            <nav className="navbar">
                <ul>
                    <NavLink to="/">
                        Home
                    </NavLink>

                    <NavLink
                        to="/signup">
                        Sign up
                    </NavLink>

                    <NavLink
                        to="/login">
                        Log in
                    </NavLink>
                </ul>
            </nav>            
        </header>
    )
}

export default Navbar