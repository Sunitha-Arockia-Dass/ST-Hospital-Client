import axios from "axios";
import { useState, useEffect } from "react";
import URL from "../links/links.json";

function PatientInfo({ selectedAppt, setPatientDetailsView }) {
  console.log("selectedAppt", selectedAppt);
  const [user, setUser] = useState(null);
  const userId = selectedAppt[0]?.user[0]?._id;
  console.log("selectedAppt[0]?.user[0]?._id", selectedAppt[0]?.user[0]?._id);
  useEffect(() => {
    axios.get(URL.users).then((response) => {
      console.log(response.data);
      const fiteredUser = response.data.filter((user) => {
        return user._id === userId;
      });
      setUser(fiteredUser[0]);
    });
  }, []);
  console.log("fiteredUser", user);
  return (
    <div>
      <h1>Patient Basic Info</h1>
      {user && (
        <div>
          <p>
            <strong>Email:</strong>
            {user.email}
          </p>
          <p>
            <strong>Name:</strong>
            {user.firstname} {user.lastname}
          </p>
          {/* <p><strong>DOB:{user.PatientDetails.dateOfBirth}</strong></p> */}
          <p>
            <strong>GP:{user.PatientDetails.gp[0]?.name}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default PatientInfo;
