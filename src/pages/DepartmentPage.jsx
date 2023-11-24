import axios from "axios";
import { useEffect, useState } from "react";
import URL from "../links/links.json";
import { Link } from 'react-router-dom';

function DepartmentPage() {
  const [departments, setDepartments] = useState();
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    axios.get(URL.departments).then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    });
  }, []);
  // const displayDept = (id) => {
  //   axios.get(`${URL.departments}/${id}`).then((foundDepartments) => {
  //     setSelectedDept(foundDepartments.data);
  //   });
  // };

  return (
    <div className="dpt-page breakout">
      {!doctor && (
        <h3>Department Page</h3>
      )}
      
<div className="all-dpt">
      {departments?.map((department) => {
              return (
                
                <Link
                  key={department._id}
                  to={`/departments/${department._id}`}
                  state={{ department }}
                >
                  <div className="one-dpt">
                    <fieldset>
                      <img src={department.image} className="dpt-img" alt="Department icon" />
                      <legend>
                        <h4>{department.name}</h4>
                      </legend>
                      <p>{department.description}</p>
                    </fieldset>
                  </div>
                </Link>
              );
            })}
            </div>
    </div>
  );
}

export default DepartmentPage;
