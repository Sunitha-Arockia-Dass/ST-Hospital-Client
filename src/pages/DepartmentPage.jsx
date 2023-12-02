import axios from "axios";
import { useEffect, useState } from "react";
import URL from "../links/links.json";
import { Link } from 'react-router-dom';
import { gsap } from "gsap/dist/gsap"

function DepartmentPage() {
  const [departments, setDepartments] = useState();
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [delayLayout, setDelayLayout] = useState(false)

  useEffect(() => {
    axios.get(URL.departments).then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    });
    setDelayLayout(true)
  }, []);


    // GPractice Animation //////////////////////////////////////////
    if(delayLayout){     
      const tlOneDpt = gsap.timeline({ defaults: { duration: .3, ease: "power1.out" } })
      tlOneDpt
      .fromTo("#dpt-main h3", {opacity: 0 }, {opacity: 1})
      .fromTo("#dpt-main .one-dpt", { x:-100, opacity: 0 }, { x:0, opacity: 1, stagger: 0.025, duration: .15},"<")
      .fromTo("#dpt-main legend", { y:-25, opacity: 0 }, { y:0, opacity: 1, stagger: 0.025, ease:"bounce"})
      .fromTo("#dpt-main .dpt-img", { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.025, ease:"bounce"})
  } 
 

  return (
    <div id="dpt-main" className="dpt-page full">
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
                <fieldset className="fieldset gradient-bg">
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
