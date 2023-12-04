import axios from "axios";
import { usestate, useEffect } from "react";
import URL from "../links/links.json";

function CreatePatientRecord({
  setPatientDetailsView,
  setCreatePRecords,
  selectedAppt,
}) {
  //   console.log('selectedAppt',selectedAppt)

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
console.log('doctor',doctor)
console.log('appointment',appointment)
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
        console.log("error", error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Blood Pressure Value:
          <input type="text" name="bloodPressure" />
        </label>

        <label>
          Heart Rate Value:
          <input type="text" name="heartRate" />
        </label>

        <label>
          Pulse Rate Value:
          <input type="text" name="pulseRate" />
        </label>

        <label>
          Temperature:
          <input type="text" name="temperature" />
        </label>
        <label>
          Complaints:
          <input type="text" name="complaints" />
        </label>
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <label>
          Prescribed Medications:
          <input type="text" name="prescribedMedications" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePatientRecord;
