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
    const patientRecord = {
      user: selectedAppt[0]?.user[0]?._id,
      record: {
        doctor: selectedAppt[0]?.doctor[0]?._id,
        appointment: selectedAppt[0]?._id,
        complaints: e.target.complaints.value,
        description: e.target.description.value,
        prescribedMedications: e.target.prescribedMedications.value,
      },
    };
    const patientVitals= {
        temperature: { value: e.target.temperature.value, range: "" },
        pulseRate: { value: e.target.pulseRate.value, range: "" },
        bloodPressure: { value: e.target.bloodPressure.value, range: "" },
        heartRate: { value: e.target.heartRate.value, range: "" },
      }
    console.log(patientRecord);
    axios
      .post(URL.patientRecordCreate, {patientRecord,patientVitals})
      .then((response) => {
        setPatientDetailsView(false);
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
