import axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";
import URL from "../links/links.json";
import { Link } from "react-router-dom";
import { gsap } from "gsap/dist/gsap";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [delayLayout, setDelayLayout] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    axios
      .get(URL.departments)
      .then((foundDepartments) => {
        setDepartments(foundDepartments.data);
        setDelayLayout(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, []);

  // GPractice Animation //////////////////////////////////////////
  useLayoutEffect(() => {
    if (delayLayout) {
      const tlOneDpt = gsap.timeline({
        defaults: { duration: 0.3, ease: "power1.out" },
      });
      tlOneDpt
        .fromTo("#dpt-main h3", { x: -20 }, { x: 0, delay: 0.5 })
        .fromTo(
          "#dpt-main .one-dpt",
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05 },
          "<"
        )
        .fromTo(
          "#dpt-main legend",
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: "bounce" },
          0.75
        )
        .fromTo(
          "#dpt-main .dpt-img",
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.05, ease: "bounce" },
          "<"
        );
    }
  }, [delayLayout]);

  return (
    <div id="dpt-main" className="dpt-page full">
      {!doctor && (
        <div className="container">
          <h3>Choose your department</h3>
        </div>
      )}
      <div className="all-dpt">
        {departments.map((department) => {
          return (
            <Link
              key={department._id}
              to={`/departments/${department._id}`}
              state={{ department }}
            >
              <div className="one-dpt">
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default DepartmentPage;
