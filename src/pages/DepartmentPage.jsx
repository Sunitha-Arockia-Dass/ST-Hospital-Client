import axios from "axios";
import { useEffect, useState } from "react";
import SingleDoctor from "../components/SingleDoctor";
import SingleDept from "../components/SingleDept";
import URL from '../links/links.json'
function DepartmentPage() {
  const [departments, setDepartments] = useState();
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    axios.get(URL.departments).then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    });
  }, []);
  const displayDept = (id) => {
    axios
      .get(`${URL.departments}/${id}`)
      .then((foundDepartments) => {
        setSelectedDept(foundDepartments.data);
      });
  };

  return (
    <div className="dpt-page breakout">
      {!doctor && (
        <h3>Department Page</h3>
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
                  onClick={() => displayDept(department._id)}
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

          )
          }
        </div>
      )}
    </div>
  );
}

export default DepartmentPage;
