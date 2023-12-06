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
  const [errorMessage, setErrorMessage] = useState(undefined)
  useEffect(() => {
    axios
      .get(`${URL.viewPatientRecord}/${userId}`)
      .then((response) => {
        console.log('record',response.data)
        setRecords(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
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
// console.log('start',records[0].record.appointment.start)
  return (
    <div className="appt-details">   

          <h4>Patient Records</h4>
   
        <div className="appt-view">
    
      
      
      {singleRecordView ? (
        <div className="one-appointment2">
          <p><strong>Blood Pressure: </strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.bloodPressure.value} 
           ({singleRecord.vitals.bloodPressure.range}) </span></p>
          <p><strong>Heart Rate: </strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.heartRate.value}  ({singleRecord.vitals.heartRate.range}) </span></p>
          <p><strong>Pulse rate: </strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.pulseRate.value}  ({singleRecord.vitals.pulseRate.range}) </span></p>
          <p><strong>Temperature: </strong>
          <span style={getVitalsStyle(singleRecord.vitals.bloodPressure.range)}>

          {singleRecord.vitals.temperature.value}  ({singleRecord.vitals.temperature.range}) </span></p>
          <p><strong>Complaints: </strong>{singleRecord.complaints}  </p>
          <p><strong>Description: </strong>{singleRecord.description}  </p>
          <p><strong>Prescribed Medications: </strong>{singleRecord.prescribedMedications}</p>
                  <p><strong>Record Created By: Dr {singleRecord.doctor.firstname} {singleRecord.doctor.lastname} </strong></p>       
        <button className="back" onClick={()=>{setSingleRecordView(false)}}>↩ Back</button>
        </div>
      ) : (
        <>
          {records?.record.map((record) => {
            return (
              <button className="back one-appointment" key={record._id} onClick={()=>{showSingleRecord(record)}}>
                <p>{formatDateTime(record.appointment.start)} </p>
              </button>
            );
          })}
        </>
      )}
      </div>
  
      {errorMessage && <p className="error-message">{errorMessage}</p>}  
   
    </div>
  );
}

export default ViewPatientRecord;
