import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

function IsLogged() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
  
    // Load user when initializing the IsLogged in a page
    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/users/1`)
    //         .then(response => response.json())
    //         .then(user => {
    //             setLoggedInUser(user)
    //         })
    // }, [])

    if (!isLoggedIn) return <Navigate to="/login" />
}

export default IsLogged