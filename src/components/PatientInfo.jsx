import axios from "axios";
import { useState, useEffect } from "react";
import URL from "../links/links.json";

function PatientInfo({
  selectedAppt,
  setPatientDetailsView,
  setPatientInfoView,
}) {
  const [user, setUser] = useState(null);
  const userId = selectedAppt[0]?.user[0]?._id;
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    axios
      .get(URL.users)
      .then((response) => {
        const fiteredUser = response.data.filter((user) => {
          return user._id === userId;
        });
        setUser(fiteredUser[0]);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, []);
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }
  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birth month is after the current month or the birth month is the same but birth day is after today, subtract 1 from age
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  return (
    <div className="appt-details">
      <h4>Patient Info</h4>
      <div className="appt-view">
        {user && (
          <div className="one-appointment2">
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Name: </strong>
              {user.firstname} {user.lastname}
            </p>
            {user.patientDetails && user.patientDetails.dateOfBirth && (
              <p>
                <strong>
                  DOB: {formatDate(user.patientDetails.dateOfBirth)}
                </strong>
              </p>
            )}
            {user.patientDetails && user.patientDetails.dateOfBirth && (
              <p>
                <strong>Age: </strong>
                {calculateAge(user.patientDetails.dateOfBirth)}
              </p>
            )}
            {user.patientDetails &&
              user.patientDetails.gp &&
              user.patientDetails.gp.length > 0 && (
                <p>
                  <strong>GP: </strong>
                  {user.patientDetails.gp[0]?.name}
                </p>
              )}
            {user.patientDetails && user.patientDetails.gender && (
              <p>
                <strong>Gender: </strong>
                {user.patientDetails.gender}
              </p>
            )}
            <button
              className="back"
              onClick={() => {
                setPatientInfoView(false);
              }}
            >
              ↩ Back
            </button>
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default PatientInfo;
