import axios from "axios";
import { NavLink } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";


function PatientPersonalInfo(){
    const { user } = useContext(AuthContext);
    const [gp, setGP] = useState(null);

    useEffect(() => {
      if(user.patientDetails){

        axios
        .get(`${URL.gPractice}/${user.patientDetails.gp[0]._id}`)
        .then((response) => {
          // console.log(response.data);
          setGP(response.data);
        })
        .catch((error) => console.log("error", error));
      }
      }, [user.patientDetails]);
    

return(
    <div >
      <h4>Patient Details</h4>
      
      {user? (<div className="user-detail">
      <h5>First Name:{user.firstname}</h5>
      <h5>Last Name:{user.lastname}</h5>
      <h6>Username:{user.username}</h6>
      <h6>Email:{user.email}</h6>
      {user.patientDetails && <div><h6>DOB:{user.patientDetails.dateOfBirth}</h6>
      <h6>Phone:{user.patientDetails.contactNumber}</h6>
      <h6>General Practice:{gp?.name}</h6>
      <p>Address:{user.patientDetails.address.street} {user.patientDetails.address.houseNumber} </p>
      <p>{user.patientDetails.address.postalCode} {user.patientDetails.address.city} </p>
      <p>{user.patientDetails.address.country}</p></div>}
      <NavLink to="/editaccount">
        
        <button>Edit Account</button>
      
    </NavLink>
      
      
      </div>):<></>}
      
    </div>
  );

}

export default PatientPersonalInfo