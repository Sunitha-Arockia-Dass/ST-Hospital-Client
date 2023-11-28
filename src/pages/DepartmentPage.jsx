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
 

  return (
    <div className="dpt-page full">
      {!doctor && (
        <div className="container">
          <h3>Choose your department</h3>
        </div>
      )}
      <div className="all-dpt">
        {departments?.map((department) => {
          return (

            <Link
              key={department._id}
              to={`/departments/${department._id}`}
              state={{ department }}
            >
              <div className="one-dpt" onClick={() => displayDept(department._id)}>
                <fieldset className="fieldset">
                  <legend>
                    <h4>{department.name}</h4>
                  </legend>
                  <p>{department.description}</p>
                  <div className="dpt-img">
                    <img src={department.image} alt="Department icon" />
                  </div>
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
