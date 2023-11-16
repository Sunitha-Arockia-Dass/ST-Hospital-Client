

function SingleDept({selectedDept,setSelectedDept,setDoctor}){
    function displayDoctor(doctor) {
        setDoctor(doctor);
      }
    

    return(
        <div key={selectedDept._id}>
          <h4>{selectedDept.name}</h4><img src={selectedDept.image} alt="Department icon"/>
          <h5>{selectedDept.description}</h5>
          <h6>Doctors:</h6>
            {selectedDept.doctors.map((doctor, index) => {
              return (
                <p key={index} onClick={() => displayDoctor(doctor)}>
                  {doctor.position}: {doctor.firstname} {doctor.lastname},
                </p>
              );
            })}
          
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