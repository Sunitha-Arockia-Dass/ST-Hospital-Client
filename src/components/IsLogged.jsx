import { useState } from "react"
import { Navigate } from "react-router-dom"

function IsLogged (){
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    if (!isLoggedIn) return <Navigate to="/login" />
}

export default IsLogged