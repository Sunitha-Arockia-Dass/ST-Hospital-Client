import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";

function PatientGPracticeDetails() {
  const [gp, setGP] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(user.patientDetails){

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
    <div >
      <h4>Patient GPractice Details</h4>
      {gp? (<div className="gp-detail">
      <h5>{gp.name}</h5>
      <h6>{gp.email}</h6>
      <h6>{gp.phoneNumber}</h6>
      <p>{gp.address.street} {gp.address.houseNumber} </p>
      <p>{gp.address.postalCode} {gp.address.city} </p>
      <p>{gp.address.country}</p>
      
      </div>):<></>}
    </div>
  );
}

export default PatientGPracticeDetails;
