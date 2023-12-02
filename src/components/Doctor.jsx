import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/auth.context";

function Doctor(){
    const { user } = useContext(AuthContext)


    return(
        <div>
            <h1>Dr.{user.firstname} {user.lastname}</h1>
        </div>
    )

}

export default Doctor