import DoctorCalendarComponent from "./DoctorCalendarComponent";
import { useNavigate, useLocation, Link } from "react-router-dom";


function SingleDoctor() {
  const location = useLocation();
  const navigate = useNavigate()
  const doctor = location.state?.doctor
  const department = location.state?.department
  // console.log(doctor.department)

  return (
    <div className="single-doctor dpt-page">


      <div className="single-dpt">
        <fieldset className="fieldset gradient-bg">
          <legend><h3>{doctor.firstname} {doctor.lastname}</h3></legend>
          <div className="single-doc-img">
            <img src={department.image} alt="Department icon" />
          </div>
          <h6>{doctor.position} Doctor of {department.name}</h6>
        </fieldset>
        <button className="back" onClick={() => { navigate(-1) }}>↩ Back</button>
      </div>

      <div className="single-dpt dpt-page">
        <div className="calendar-container">
          <DoctorCalendarComponent doctor={doctor} selectedDept={department} update={false} />
        </div>
      </div>

    </div>
  )
}

export default SingleDoctor;
