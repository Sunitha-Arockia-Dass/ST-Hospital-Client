import axios from "axios";
import { useEffect, useState } from "react";

function DepartmentPage() {
  const [departments, setDepartments] = useState();
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5005/departments").then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    });
  }, []);
  const displayDept = (id) => {
    setSelectedDeptId(id);
    const filteredDept = departments.filter((department) => {
      return department._id === id;
    });
    setSelectedDept(filteredDept[0]);
  };

  return (
    <div>
      <h1>Department Page</h1>
      {setSelectedDeptId && selectedDept ? (
        <div key={selectedDept._id}>
          <h1>{selectedDept.name}</h1>
          <h2>{selectedDept.description}</h2>
          <h2>Doctors:{selectedDept.doctors}</h2>
          <button
            onClick={() => {
              setSelectedDeptId(null);
              setSelectedDept(null);}}>Back</button>
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
