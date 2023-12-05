import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";

function PatientGPracticeDetails() {
  const [gp, setGP] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(user.patientDetails.gp.length>0){

      axios
      .get(`${URL.gPractice}/${user.patientDetails.gp[0]?._id}`)
      .then((response) => {
        // console.log(response.data);
        setGP(response.data);
      })
      .catch((error) => console.log("error", error));
    }
  }, [user.patientDetails]);

  return (
    <div className="gp-detail">
      <fieldset>
      <legend>
      <h4>Your Doctor</h4>
      </legend>
      {gp? (<div>
      <h5>{gp.name}</h5>
      <p>{gp.email}</p>
      <p>{gp.phoneNumber}</p>
      <p>{gp.address.street} {gp.address.houseNumber} </p>
      <p>{gp.address.postalCode} {gp.address.city} </p>
      <p>{gp.address.country}</p>
      
      </div>):<p>Please update your General Practitioner</p>}
      </fieldset>
      <NavLink to="/editaccount"> 
        <button className="back">Edit General Practitioner</button>
      </NavLink>
    </div>
  );
}

export default PatientGPracticeDetails;
