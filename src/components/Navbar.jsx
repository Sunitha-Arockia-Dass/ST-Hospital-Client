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

            {/* toggle dark light mode button with local storage */}
            <button id="dark-mode-toggle" className="dark-mode-toggle">
                <svg width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496">
                    <path fill="currentColor"
                        d="M8,256C8,393,119,504,256,504S504,393,504,256,393,8,256,8,8,119,8,256ZM256,440V72a184,184,0,0,1,0,368Z"
                        transform="translate(-8 -8)" />
                </svg>
            </button>
            
        </header>
    )
}

export default Navbar