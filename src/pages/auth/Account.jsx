import { NavLink } from "react-router-dom"

function Account() {
    return (
        <div id="account">            
            <h3>Welcome to your Account</h3>
            <p>We can display information here</p>
            
            <NavLink to="/editaccount">
            <form>
                <button>Edit Account</button>
            </form>
            </NavLink>
        </div>
    )
}

export default Account