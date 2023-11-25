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
    <div className="dpt-page full">
      {!doctor && (
        <div className="container breakout">
        <h3>Department Page</h3>
        </div>
      )}
      {doctor ? (
        <SingleDoctor doctor={doctor} selectedDept={selectedDept} setDoctor={setDoctor} />
      ) : (
        <div className="all-dpt">
          {selectedDept ? (
            <SingleDept
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              setDoctor={setDoctor}
            />
          ) : (
            departments?.map((department) => {
              return (
                <div className="one-dpt"
                  key={department._id}
                  to={`/department/${department._id}`}
                  state={{ department }}
                >
                  <fieldset>
                    <legend><h4>{department.name}</h4></legend>
                    <p>{department.description}</p>
                    <div className="dpt-img">
                      <img src={department.image} alt="Department icon" />
                    </div>
                  </fieldset>
                </div>
              );
            })
          )}
        </div>
      )} */}

      {departments?.map((department) => {
              return (
                  <Link
                    key={department._id}
                    to={`/departments/${department._id}`}
                    state={{ department }}
                  >
                <div className="one-dpt" onClick={() => displayDept(department._id)}>
                    <fieldset>
                      <img src={department.image} className="dpt-img" alt="Department icon" />
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
            })
          )}
        </div>
      )}


    </div>
  )

}

export default DepartmentPage;
