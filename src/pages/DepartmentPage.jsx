import axios from "axios";
import { useEffect, useState } from "react";
// import SingleDoctor from '../components/'

function DepartmentPage() {
  const [departments, setDepartments] = useState();
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5005/departments").then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    });
  }, []);
  const displayDept = (id) => {
    axios
      .get(`http://localhost:5005/departments/${id}`)
      .then((foundDepartments) => {
        setSelectedDept(foundDepartments.data);
      });
  };

  return (
    <div>
      <h1>Department Page</h1>
      {selectedDept ? (
        <div key={selectedDept._id}>
          <h1>{selectedDept.name}</h1>
          <h2>{selectedDept.description}</h2>
          <h2>
            Doctors:
            {selectedDept.doctors.map((doctor, index) => {
              return (
                <p key={index} onClick={()=>{<SingleDoctor />}}>
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
      ) : (
        departments?.map((department) => {
          return (
            <div
              key={department._id}
              onClick={() => displayDept(department._id)}
            >
              <h2>{department.name}</h2>
              <p>{department.description}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default DepartmentPage;
