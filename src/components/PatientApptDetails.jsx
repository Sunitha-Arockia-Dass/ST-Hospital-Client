import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
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
  useEffect(() => {
    axios.get(`${URL.getPatientAppointment}/${user._id}`).then((appts) => {
      console.log(appts.data);

      setAppts(appts.data);
      // setView((prevState) => ({
      //   ...prevState,
      //   viewAppt: true,
      // }));
    });

  }, [])
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
    console.log("filteredAppt", filteredAppt[0]._id);

    setView((prevState) => ({
      ...prevState,
      details: filteredAppt,
      detailView: true,
      viewAppt: false,
    }));
  }
  const deleteappt = (id) => {
    console.log('deleteappt', id)
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
      viewAppt: true,
    }));
  }
  return (
    <div className="appt-details">
      <fieldset>
        <legend>
          <h4>Your Upcoming Appointments</h4>
        </legend>

        {appts ? (
          <div className="appt-view">
            {appts && appts.length > 0 ? (
              appts.map((appt) => (
                <div key={appt.id} className="one-appointment">
                  <h5>
                    {new Date(appt.start).toDateString()}, {convertTo12HourFormat(appt.start)}
                  </h5>
                  <button className="back view-detail" onClick={() => viewDetail(appt._id)}>
                    View Details
                  </button>
                  {/* Other buttons */}
                </div>
              ))
            ) : (
              <p>No upcoming appointments at this time.</p>
            )}
            {/* <button className="back"
            onClick={() => {
              setView((prevState) => ({
                ...prevState,
                viewAppt: false,
              }));
            }}>
            ↩ Back
          </button> */}

          </div>
        ) : (
          <></>
        )}

        {view.details && view.detailView ? (
          
          <div className="appt-specific">
            <h4>
              With Doctor {view.details[0].doctor[0].firstname} {view.details[0].doctor[0].lastname}
            </h4>

            <h5>
              {convertTo12HourFormat(view.details[0].start)} on{" "}
              {new Date(view.details[0].start).toDateString()}
            </h5>

            <h5>{view.details[0].department[0].name}</h5>
            <br/>

            <button className="back"
              onClick={() => {
                updateAppt(view.details._id);
              }}
            >
              Edit your appointments
            </button>

            <button className="back"
              onClick={() => {
                console.log(view.details)
                deleteappt(view.details[0]._id);
              }}
            >
              Cancel your appointments
            </button>

          <br/>
            <button className="back"
              onClick={() => {
                setView((prevState) => ({
                  ...prevState,
                  viewAppt: true,
                  detailView: false,
                  updateViewAppt: false,
                }));
              }}
            >
              ↩ Back
            </button>
          </div>
          
        ) : (
          <></>
        )}
        {view.updateViewAppt ? (
          <div>
            <button className="back"
              onClick={() => {
                setView((prevState) => ({
                  ...prevState,
                  detailView: true,
                  updateViewAppt: false,
                }));
              }}
            >
              ↩ Back to this Appointment
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
      </fieldset>

      {/* {!view.viewAppt && (    
          <button className="back" onClick={getAppt}>View All appointments</button>
    )}  */}
    </div>
  );
}

export default PatientApptDetails;
