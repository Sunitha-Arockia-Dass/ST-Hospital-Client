import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import PatientCalendar from "./PatientCalendar";
import URL from "../links/links.json";

function Patient() {
  const { user } = useContext(AuthContext);
  const [viewAppt, setViewAppt] = useState(false);
  const [updateAppt, setUpdateAppt] = useState(false);
  const [appts, setAppts] = useState();
  const [details, setDetails] = useState([]);
  const [detailView, setDetailView] = useState(false);
  const getAppt = () => {
    console.log(user._id);
    axios.get(`${URL.getPatientAppointment}/${user._id}`).then((appts) => {
      console.log(appts.data);
      setAppts(appts.data);
      setViewAppt(true)
      setUpdateAppt(false)
      setDetailView(false)
      // const transformedEvents = transformEvents(appts.data);
      console.log();
      // setEvents(transformedEvents);
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
    console.log(id)
    const filteredAppt = appts.filter((appt) => {
      return appt._id === id;
    });
    console.log('filteredAppt',filteredAppt)
    setDetails(filteredAppt);
    setDetailView(true)
    setViewAppt(false)
  }
  return (
    <div>
      <h3>This is {user.username} Account</h3>
        <button onClick={getAppt}>View All appointments</button>
        <div>
          {viewAppt ? appts.map((appt) => {
            return (
              <div key={appt.id}>
                <h4>Appt Time:{convertTo12HourFormat(appt.start)}</h4>
                {/* <h4>
                  Doctor:{appt.doctor[0].firstname} {appt.doctor[0].lastname}
                </h4> */}
                <button
                  onClick={() => {
                    viewDetail(appt._id);
                  }}
                >
                  View Details
                </button>
                <button onClick={() => {setUpdateAppt(true)
                setViewAppt(false)}
                }>
                  Update your appointments
                </button>
                <button onClick={() => {setUpdateAppt(true)
                setViewAppt(false)}
                }>
                  Delete your appointments
                </button>
              </div>
            );
          }):<></>}
        </div>

      {updateAppt ? <PatientCalendar /> :<></>}
      {details && detailView?(
        <div>
          <h4>Appt Time:{convertTo12HourFormat(details[0].start)}</h4>
          <h4>
            Doctor:{details[0].doctor[0].firstname} {details[0].doctor[0].lastname}
          </h4>
          <h4>
            Department:{details[0].department[0].name} 
          </h4>
          <button onClick={() => {setUpdateAppt(true)
                setViewAppt(false)}
                }>
                  Update your appointments
                </button>
        </div>
      ):<></>}
    </div>
  );
}

export default Patient;
