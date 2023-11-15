import React from "react";


const SingleDept=({selectedDept,setSelectedDept,setDoctor})=>{
    function displayDoctor(doctor) {
        setDoctor(doctor);
      }
    

    return(
        <div key={selectedDept._id}>
          <h1>{selectedDept.name}</h1>
          <h2>{selectedDept.description}</h2>
          <h2>
            Doctors:
            {selectedDept.doctors.map((doctor, index) => {
              return (
                <p key={index} onClick={() => displayDoctor(doctor)}>
                  {doctor.position}:{doctor.firstname} {doctor.lastname},
                </p>
              );
            })}
          </h2>
          <img src={selectedDept.image} alt="error"></img>
          <button
            onClick={() => {
              setSelectedDept(null);
            }}
          >
            Back
          </button>
        </div>
      ) 

}

export default SingleDept