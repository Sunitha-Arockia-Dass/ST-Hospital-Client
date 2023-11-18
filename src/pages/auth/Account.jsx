import { NavLink,useNavigate } from "react-router-dom"
import Patient from "../../components/Patient"
import Doctor from "../../components/Doctor"
import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";



function Account() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    return (
        <div id="account">  
        {user.role==='patient' && 

            <Patient />
        }
        {
            user.role==='patient' && 

            <Doctor />
        }
        {
            user.role==='admin' && 
navigate('/admin')
            
        }
            <NavLink to="/editaccount">
            <form>
                <button>Edit Account</button>
            </form>
            </NavLink>
        </div>
    )
}

export default Account