import CalendarComponent from "./CalendarComponent";

function SingleDoctor({ doctor, selectedDept, setDoctor }) {
  return (
    <div className="row">
    <div className="col-3">
      <h1>Doctor Details</h1>
      <h2>
        {doctor.firstname} {doctor.lastname}
      </h2>
      <h3>
        Position:
        <strong>
          {doctor.position} Doctor of {selectedDept.name}
        </strong>
      </h3>
      <button
        onClick={() => {
          setDoctor(null);
        }}
      >
        Back
      </button>
      </div>
        <div className="col-6">
        <div className="calendar-container">
          <CalendarComponent />
        </div>
                </div>
      

      <div></div>
    </div>
  );
}

export default SingleDoctor;
