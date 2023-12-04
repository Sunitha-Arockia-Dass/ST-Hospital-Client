import axios from "axios";
import { useState, useEffect } from "react";
import URL from '../links/links.json'

function ViewPatientRecord({setPatientDetailsView,setViewPRecords,selectedAppt}) {
  const [records, setRecords] = useState();
  useEffect(() => {
    axios.get(`${URL.viewPatientRecord}/${selectedAppt[0]?.user[0]?._id}`)
      .then((response) => {
        console.log(response.data);
        setRecords(response.data);
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
