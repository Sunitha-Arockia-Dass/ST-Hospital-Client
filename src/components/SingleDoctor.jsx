// import axios from "axios";
// import { useEffect, useState } from "react";


function SingleDoctor({ doctor, selectedDept, setDoctor }) {


  return (
    <div>
      <h3>Doctor Details</h3><img src={selectedDept.image} alt="Department icon"/>
      <h4>{doctor.firstname} {doctor.lastname}</h4>
      <h5>Position: <strong>{doctor.position} of {selectedDept.name}</strong></h5>
      <button
        onClick={() => {
          setDoctor(null);
        }}
      >
        Back
      </button>
    </div>


  )

}

export default SingleDoctor