import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchResult({ searchOutput, setSearchOutput }) {
  const { doctors, department, gPractice } = searchOutput;
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (doctors.length !== 0) {
      setResult({ type: "doctor", data: doctors });
    } else if (department.length !== 0) {
      setResult({ type: "department", data: department });
    } else if (gPractice.length !== 0) {
      setResult({ type: "gPractice", data: gPractice });
    } else {
      setResult(null); // Reset result if no data is found
    }
  }, [doctors, department, gPractice]);
  return (
    <div className="search-result">
      <p>
        <i>Click on the result</i>
      </p>
      {!result && <p>This request return no result,</p>}
      {result && (
        <div className="result">
          <p>
            {result.type === "doctor" &&
              result.data.map((doctor) => {
                return (
                  <div key={doctor._id}>
                    <Link
                      to={`/doctor/${doctor._id}`}
                      state={{
                        doctor: doctor,
                        department: doctor.department,
                      }}
                      onClick={() => {
                        setSearchOutput(null);
                      }}
                    >
                      {doctor.firstname} {doctor.lastname} of{" "}
                      {doctor.department.name}{" "}
                    </Link>
                  </div>
                );
              })}

            {result.type === "department" && 
            result.data.map((department) => {
              return (
                <div key={department._id}>
              <Link
                to={`/departments/${department._id}`}
                state={{ department: department }}
                onClick={() => {
                  setSearchOutput(null);
                }}
              >
                {department.name}
              </Link>
              </div>
                );
            })}

            {result.type === "gPractice" && 
            result.data.map((gp) => {
              return (
                <div key={gp._id}>
              <Link
                to={`/gpractice`}
                onClick={() => {
                  setSearchOutput(null);
                }}
              >
                {gp.name}
              </Link>
              </div>

              );
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
