import DoctorCalendarComponent from "./DoctorCalendarComponent";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import gsap from "gsap"


function SingleDoctor() {
  const location = useLocation();
  const navigate = useNavigate()
  const doctor = location.state?.doctor
  const department = location.state?.department

    // singletDoctor Gsap Animation //////////////////////////////////////////
 useLayoutEffect(() => {
  const tlsingleDoctor = gsap.timeline({ defaults: { duration: .25, ease: "power1.out" } })
  tlsingleDoctor
  .fromTo(".single-dpt", {opacity: 0, x:-20 }, {opacity: 1, x:0})
  .fromTo(".single-dpt legend", { y:-25, opacity: 0 }, { y:0, opacity: 1, stagger: 0.025, ease:"bounce"})
  .fromTo(".single-dpt .single-doc-img", { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.025, ease:"bounce"})
  .fromTo(".single-dpt h6", {opacity: 0, x:20 }, {opacity: 1, x:0}, "<")
  .fromTo(".calendar-container", {opacity: 0, x:20 }, {opacity: 1, x:0})
  .fromTo(".single-dpt button", {opacity: 0, x:20 }, {opacity: 1, x:0})
  })

  return (
    <div className="single-doctor dpt-page">


      <div className="single-dpt">
        <fieldset className="fieldset gradient-bg">
          <legend><h3>Dr.{doctor.firstname} {doctor.lastname}  {doctor?.education?.map(education=>(<>{education} </>))}</h3></legend>
          <div className="single-doc-img">
            <img src={department.image} alt="Department icon" />
          </div>
          <h6>{doctor.position} Doctor of {department.name}</h6>
          <h6>To Book an Appointment:{doctor.phoneNumber}</h6>
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
