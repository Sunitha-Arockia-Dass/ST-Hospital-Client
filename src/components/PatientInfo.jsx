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
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}
function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If the birth month is after the current month or the birth month is the same but birth day is after today, subtract 1 from age
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  return age;
}
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
          {user.patientDetails.dateOfBirth &&  <p><strong>DOB:{formatDate(user.patientDetails.dateOfBirth) }</strong></p>}
          {user.patientDetails.dateOfBirth && <p>
            <strong>Age:</strong>
            {calculateAge(user.patientDetails.dateOfBirth) }
          </p>}
          <p>
            <strong>GP:</strong>
            {user.patientDetails.gp[0]?.name}
          </p>
          <p>
            <strong>Gender:</strong>
            {user.patientDetails.gender}
          </p>
          
        </div>
      )}
    </div>
  );
}

export default PatientInfo;
