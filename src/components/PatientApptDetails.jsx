import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
// import PatientCalendar from "./PatientCalendar";
import DoctorCalendarComponent from "./DoctorCalendarComponent";
import URL from "../links/links.json";

function PatientApptDetails() {
  const { user } = useContext(AuthContext);
  const [appts, setAppts] = useState();
  const [view, setView] = useState({
    viewAppt: false,
    updateViewAppt: false,
    detailView: false,
    details: [],
  });

  const getAppt = () => {
    console.log(user._id);
    axios.get(`${URL.getPatientAppointment}/${user._id}`).then((appts) => {
      console.log(appts.data);

      setAppts(appts.data);
      setView((prevState) => ({
        ...prevState,
        viewAppt: true,
      }));
    });
  };
  function convertTo12HourFormat(timestamp) {
    const date = new Date(timestamp);
    const localTime = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );

    let hours = localTime.getHours();
    const minutes = ("0" + localTime.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = hours + ":" + minutes + " " + ampm;

    return formattedTime;
  }
  function viewDetail(id) {
    console.log(view.details.start);
    const filteredAppt = appts.filter((appt) => {
      return appt._id === id;
    });
    console.log("filteredAppt", filteredAppt[0]);

    setView((prevState) => ({
      ...prevState,
      details: filteredAppt,
      detailView: true,
      viewAppt: false,
    }));
  }
  const deleteappt = (id) => {
    axios.delete(`${URL.patientDeleteAppt}/${id}`).then((response) => {
      setView((prevState) => ({
        ...prevState,
        updateViewAppt: false,
        detailView: false,
        viewAppt: true,
      }));
      getAppt();
      console.log(response);
    });
  };
  function updateAppt() {
    console.log(view.details[0]);

    setView((prevState) => ({
      ...prevState,
      updateViewAppt: true,
      viewAppt: false,
    }));
  }
  return (
    <div>
      {!view.viewAppt && (
        <button onClick={getAppt}>View All appointments</button>
      )}
      {view.viewAppt ? (
        <div>
          <button
            onClick={() => {
              setView((prevState) => ({
                ...prevState,
                viewAppt: false,
              }));
            }}
          >
            Back
          </button>
          {appts && appts.length > 0 ? (
            appts.map((appt) => (
              <div key={appt.id}>
                <h4>
                  Appt Time:{convertTo12HourFormat(appt.start)} on{" "}
                  {new Date(appt.start).toDateString()}
                </h4>
                <button onClick={() => viewDetail(appt._id)}>
                  View Details
                </button>
                {/* Other buttons */}
              </div>
            ))
          ) : (
            <p>No upcoming appointments at this time.</p>
          )}
        </div>
      ) : (
        <></>
      )}

      {view.details && view.detailView ? (
        <div>
          <h4>
            Appt Time:{convertTo12HourFormat(view.details[0].start)} on{" "}
            {new Date(view.details[0].start).toDateString()}
          </h4>{" "}
          <h4>
            Doctor:{view.details[0].doctor[0].firstname}
            {view.details[0].doctor[0].lastname}
          </h4>
          <h4>Department:{view.details[0].department[0].name}</h4>
          <button
            onClick={() => {
              updateAppt(view.details._id);
            }}
          >
            Change your appointments
          </button>
          <button
            onClick={() => {
              deleteappt(view.details._id);
            }}
          >
            Cancel your appointments
          </button>
          <button
            onClick={() => {
              setView((prevState) => ({
                ...prevState,
                viewAppt: true,
                detailView: false,
                updateViewAppt: false,
              }));
            }}
          >
            Back
          </button>
        </div>
      ) : (
        <></>
      )}
      {view.updateViewAppt ? (
        <div>
          <button
            onClick={() => {
              setView((prevState) => ({
                ...prevState,
                detailView: true,
                updateViewAppt: false,
              }));
            }}
          >
            Back
          </button>
          <DoctorCalendarComponent
            details={view.details[0]}
            doctor={view.details[0].doctor[0]}
            selectedDept={view.details[0].department[0]}
            update={true}
            updateCallback={getAppt}
            setView={setView}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PatientApptDetails;
