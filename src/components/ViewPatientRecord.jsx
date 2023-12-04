import axios from "axios";
import { useState, useEffect } from "react";
import URL from '../links/links.json'

function ViewPatientRecord({setPatientDetailsView,setViewPRecords,selectedAppt}) {
  const [records, setRecords] = useState();
  const userId=selectedAppt[0]?.user[0]?._id
  useEffect(() => {
    axios.get(URL.viewPatientRecord)
      .then((response) => {
        const filteredRecord=response.data.filter(record=>{
          return record.user===userId;
        })
        console.log(filteredRecord[0]);
        setRecords(filteredRecord[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
  <div>

PATIENT RECORD PAGE
  </div>
  );
}

export default ViewPatientRecord;
