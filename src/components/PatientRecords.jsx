import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import URL from '../links/links.json'
function PatientRecords() {
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  console.log('userId',userId)
  const [records, setRecords] = useState();
  const [singleRecordView, setSingleRecordView] = useState(false);
  const [singleRecord, setSingleRecord] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL.viewPatientRecord}/${userId}`)
      .then((response) => {
        // console.log(response.data);
        setRecords(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  function showSingleRecord(record) {
    setSingleRecordView(true);
    setSingleRecord(record)
    console.log('record',record)
  }
  function getVitalsStyle(range) {
    if (range === 'Normal') {
      return { color: 'green' };
    } else {
      return { color: 'red' };
    }
  }
  console.log('start',records)
  return (
    <div className="appt-details">
     <fieldset>
      <legend>
      <h4>Patient Records</h4>
      </legend>
      <div className="appt-view">
      {singleRecordView ? (
        <>
        <button className="back" onClick={()=>{setSingleRecordView(false)}}>Back</button>
          <p><strong>Blood Pressure :</strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.bloodPressure.value} 
           ({singleRecord.vitals.bloodPressure.range}) </span></p>
          <p><strong>Heart Rate :</strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.heartRate.value}  ({singleRecord.vitals.heartRate.range}) </span></p>
          <p><strong>Pulse rate :</strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.pulseRate.value}  ({singleRecord.vitals.pulseRate.range}) </span></p>
          <p><strong>Temperature :</strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.temperature.value}  ({singleRecord.vitals.temperature.range}) </span></p>
          <p><strong>Complaints :</strong>{singleRecord.complaints}  </p>
          <p><strong>Description :</strong>{singleRecord.description}  </p>
          <p><strong>Prescribed Medications :</strong>{singleRecord.prescribedMedications}</p>
        </>
      ) : (
        <>
          {records?.record.map((record) => {
            return (
              <div key={record._id} onClick={()=>{showSingleRecord(record)}}>
                {/* <p>{formatDateTime(record.appointment.start)} </p> */}
              </div>
            );
          })}
        </>
      )}
      </div>
      </fieldset>
    </div>
  );
}

export default PatientRecords;
