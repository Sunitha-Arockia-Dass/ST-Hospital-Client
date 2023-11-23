import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchResult({ searchOutput }) {
  const { doctors, department, gPractice } = searchOutput;
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (doctors.length !== 0) {
      setResult({ type: "doctor", data: doctors[0] });
    } else if (department.length !== 0) {
      setResult({ type: "department", data: department[0] });
    } else if (gPractice.length !== 0) {
      setResult({ type: "gPractice", data: gPractice[0] });
    } else {
      setResult(null); // Reset result if no data is found
    }
  }, [doctors, department, gPractice]);
  console.log(searchOutput);
  return (
    <div className="search-result">
      {result && (
        <div>
          <h1>
            
              {result.type === "doctor" &&<Link
              to={`/doctor/${result.data._id}`}
              state={{
                doctor: result.data,
                department: result.data.department[0],
              }}
            >
                {result.data.firstname} {result.data.lastname}  </Link>}
           

            {result.type === "department" && (
              <Link
                to={`/departments/${result.data._id}`}
                state={{ department: result.data }}
              >
                {result.data.name}
              </Link>
            )}

            {result.type === "gPractice" && (
              <Link to={`/gpractice`}>{result.data.name} </Link>
            )}
          </h1>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
