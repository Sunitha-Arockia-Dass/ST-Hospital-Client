import CalendarComponent from "./CalendarComponent";

function SingleDoctor({ doctor, selectedDept, setDoctor }) {
  return (
    <div className="row">
      <div className="col-3">
        <h3>Doctor Details</h3><img src={selectedDept.image} alt="Department icon" />
        <h4>{doctor.firstname} {doctor.lastname}</h4>
        <h5>Position: <strong>{doctor.position} Doctor of {selectedDept.name}</strong></h5>
        <button onClick={() => { setDoctor(null); }}>Back</button>
      </div>

      <div className="col-6">
        <div className="calendar-container">
          <CalendarComponent />
        </div>
      </div>

    </div>
  )
}

export default SingleDoctor;
