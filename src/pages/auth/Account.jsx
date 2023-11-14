import { NavLink } from "react-router-dom"

function Account() {
    return (
        <>
        <div id="account">
            
            <h2>Welcome to your Account</h2>
            <p>We can display information here</p>
            
            <NavLink to="/editaccount">
            <form>
                <button>Edit Account</button>
            </form>
            </NavLink>
        </div>
        </>
    )
}

export default Account