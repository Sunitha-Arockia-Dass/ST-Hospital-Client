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
        <div className="dpt-page single-dpt" key={department._id}>
          <fieldset className="fieldset">
          <legend><h3>{department?.name}</h3></legend>
          <p>{department?.description}</p>
          
          <h4 className="doctors">Doctors:</h4>
            {department.doctors?.map((doctor) => {
              return (
                <Link
                  key={doctor._id}
                  to={`/doctor/${doctor._id}`}
                  state={{ doctor :doctor,
                  department:department}}
                >
                <p className="doctor">
                  {doctor.position}: {doctor.firstname} {doctor.lastname} </p>
                </Link>
              );
            })}
          <div className="single-img">
          <img src={department?.image} alt="Department icon"/>
          </div>
          </fieldset>
          
          <button className="back"
            onClick={() => {
              // setdepartment(null);
              navigate(-1)
            }}
          >
            ↩ Back
          </button>
        </div>
      ) 

}

export default SingleDept