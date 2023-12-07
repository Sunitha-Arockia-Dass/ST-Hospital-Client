import axios from "axios";
import { useState, useEffect } from "react";
import URL from "../links/links.json";

function CreatePatientRecord({
  setPatientDetailsView,
  setCreatePRecords,
  selectedAppt,
}) {
  const [errorMessage, setErrorMessage] = useState(undefined)

  function handleSubmit(e) {
    e.preventDefault();
    const user = selectedAppt[0]?.user[0]?._id;
    const doctor = selectedAppt[0]?.doctor[0]?._id;
    const appointment = selectedAppt[0]?._id;
    const complaints = e.target.complaints.value;
    const description = e.target.description.value;
    const prescribedMedications = e.target.prescribedMedications.value;
    const temperature = e.target.temperature.value;
    const pulseRate = e.target.pulseRate.value;
    const bloodPressure = e.target.bloodPressure.value;
    const heartRate = e.target.heartRate.value;
    console.log('doctor', doctor)
    console.log('appointment', appointment)
    console.log('user', user)
    axios
      .post(URL.patientRecordCreate, {
        user,
        doctor,
        appointment,
        complaints,
        description,
        prescribedMedications,
        temperature,
        pulseRate,
        bloodPressure,
        heartRate,
      })
      .then((response) => {
        // setPatientDetailsView(false);
        setCreatePRecords(false);
        console.log(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      })
  }

  return (
    <div className="second-block gradient-bg">
      <form onSubmit={handleSubmit}>

        <input type="text" name="bloodPressure" placeholder="Blood Pressure" />

        <input type="text" name="heartRate" placeholder="Heart Rate" />

        <input type="text" name="pulseRate" placeholder="Pulse Rate" />

        <input type="text" name="temperature" placeholder="Temperature" />

        <input type="text" name="complaints" placeholder="Complaints" />

        <input type="text" name="description" placeholder="Description" />

        <input type="text" name="prescribedMedications" placeholder="Prescribed Medications" />

        <button className="back" type="submit">Create</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}

export default CreatePatientRecord;
