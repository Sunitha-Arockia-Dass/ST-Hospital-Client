import React from "react";
import { useNavigate ,useLocation, Link} from "react-router-dom";


const SingleDept=()=>{
  const location = useLocation();

  const navigate=useNavigate()
  
  // function displayDoctor(doctor) {
    //       setDoctor(doctor);
    //     }
    const department = location.state?.department

    return(
        <div key={department._id}>
          <h4>{department?.name}</h4><img src={department?.image} alt="Department icon"/>
          <h5>{department?.description}</h5>
          <h6>Doctors:</h6>
            {department.doctors?.map((doctor) => {
              return (
                <Link
                  key={doctor._id}
                  to={`/doctor/${doctor._id}`}
                  state={{ doctor :doctor,
                  department:department}}
                >
                <p >
                  {doctor.position}: {doctor.firstname} {doctor.lastname},
                </p>
                </Link>
              );
            })}
          
          <button
            onClick={() => {
              // setdepartment(null);
              navigate(-1)
            }}
          >
            Back
          </button>
        </div>
      ) 

}

export default SingleDept