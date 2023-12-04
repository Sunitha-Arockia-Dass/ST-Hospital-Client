import axios from "axios";
import { useState, useEffect } from "react";
import URL from "../links/links.json";

function ViewPatientRecord({
  setPatientDetailsView,
  setViewPRecords,
  selectedAppt,
}) {
  const [records, setRecords] = useState();
  const [singleRecordView, setSingleRecordView] = useState(false);
  const [singleRecord, setSingleRecord] = useState(null);
  const userId = selectedAppt[0]?.user[0]?._id;
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

  return (
    <div>
      <h1>PATIENT RECORD PAGE</h1>
      {singleRecordView ? (
        <>
        <button onClick={()=>{setSingleRecordView(false)}}>Back</button>
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
                <p>{formatDateTime(record.appointment.start)} </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default ViewPatientRecord;
