import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchResult({ searchOutput,setSearchOutput }) {
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
     <p><i>Click on the result</i></p>
     {!result && <p>This request return no result,</p>}
      {result && (
        <div className="result">
          <p>
           
              {result.type === "doctor" &&<Link
              to={`/doctor/${result.data._id}`}
              state={{
                doctor: result.data,
                department: result.data.department,
              }}
              onClick={()=>{setSearchOutput(null)}}
            >
                {result.data.firstname} {result.data.lastname}  </Link>}
           

            {result.type === "department" && (
              <Link
                to={`/departments/${result.data._id}`}
                state={{ department: result.data }}
                onClick={()=>{setSearchOutput(null)}}
              >
                {result.data.name}
              </Link>
            )}

            {result.type === "gPractice" && (
              <Link to={`/gpractice`} onClick={()=>{setSearchOutput(null)}}>{result.data.name} </Link>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
