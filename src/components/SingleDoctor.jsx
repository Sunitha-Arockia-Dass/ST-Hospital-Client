// import axios from "axios";
// import { useEffect, useState } from "react";


function SingleDoctor({doctor,selectedDept,setDoctor}){
    

   return(
    <div>
    <h1>Doctor Details</h1>
     <h2>{doctor.firstname} {doctor.lastname}</h2>
     <h3>Position:<strong>{doctor.position} of {selectedDept.name}</strong></h3>
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