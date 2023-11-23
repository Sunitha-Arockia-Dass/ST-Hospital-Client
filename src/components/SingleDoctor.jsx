import DoctorCalendarComponent from "./DoctorCalendarComponent";
import { useNavigate ,useLocation, Link} from "react-router-dom";


function SingleDoctor() {
  const location = useLocation();
  const navigate=useNavigate()
  const doctor = location.state?.doctor
  const department = location.state?.department
  // console.log(doctor.department)

  return (
    <div className="row">
      <div className="col-3">
        <h3>Doctor Details</h3>
        <img src={department.image} alt="Department icon" />
        <h4>{doctor.firstname} {doctor.lastname}</h4>
        <h5>Position: <strong>{doctor.position} Doctor of {department.name}</strong></h5>
        <button onClick={()=>{ navigate(-1)}}>Back</button>
      </div>
      <div className="col-6">
        <div className="calendar-container">
          <DoctorCalendarComponent doctor={doctor} selectedDept={department} update={false}/>
        </div>
      </div>

    </div>
  )
}

export default SingleDoctor;
