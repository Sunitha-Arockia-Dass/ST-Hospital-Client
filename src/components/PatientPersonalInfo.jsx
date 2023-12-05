import axios from "axios";
import { NavLink } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";


function PatientPersonalInfo(){
    const { user } = useContext(AuthContext);
    const [gp, setGP] = useState(null);

    useEffect(() => {
      if(user.patientDetails.gp.length>0){

        axios
        .get(`${URL.gPractice}/${user.patientDetails.gp[0]._id}`)
        .then((response) => {
          // console.log(response.data);
          setGP(response.data);
        })
        .catch((error) => console.log("error", error));
      }
      }, [user.patientDetails]);
    
      function formatDate(inputDate) {
        const date = new Date(inputDate);
    
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);
    
        return formattedDate;
    }

return(
    <div className="user-detail">
      
      
      {user? (<div>
      <fieldset>
      <legend>
      <h4>Your Details</h4>
      </legend>      
      <h5>{user.firstname} {user.lastname}</h5>   
      <p>Username: {user.username}</p>
      <p>{user.email}</p>
      {user.patientDetails && <>
      {user.patientDetails.dateOfBirth && <p>DOB:{formatDate(user.patientDetails.dateOfBirth)}</p>}
{  user.patientDetails.contactNumber && <p>Contact Number:{user.patientDetails.contactNumber}</p>      
}     {user.patientDetails.address && <> <p>Address:{user.patientDetails.address.street} {user.patientDetails.address.houseNumber}</p>
      <p>{user.patientDetails.address.postalCode} {user.patientDetails.address.city}</p>
      <p>{user.patientDetails.address.country}</p></>}
      </>
      }
      </fieldset>

      <NavLink to="/editaccount"> 
        <button className="back">Edit Account</button>
      </NavLink>      
      
      </div>
      ):<></>}
      
    </div>
  );

}

export default PatientPersonalInfo