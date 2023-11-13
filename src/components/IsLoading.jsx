import { useContext } from "react";
import { AuthContext } from "../context/auth.context";



function IsLoading(){
    const {  isLoading } = useContext(AuthContext);

    if (isLoading) return <p>Loading ...</p>;

}

export default IsLoading