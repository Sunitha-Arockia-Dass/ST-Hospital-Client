import { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreatePatientRecord from "./CreatePatientRecord";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";
import ViewPatientRecord from "./ViewPatientRecord";
import PatientInfo from "./PatientInfo";
const DoctorCalendarComponent = ({
  setView,
  updateCallback,
  details,
  doctor,
  selectedDept,
  update,
}) => {
  const apptId = details?._id;
  const { user } = useContext(AuthContext);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showTimeGrid, setShowTimeGrid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [complaints, setComplaints] = useState("");
  const [patientDetailsView, setPatientDetailsView] = useState(false);
  const [allAppts, setAllAppts] = useState();
  const [createPRecords, setCreatePRecords] = useState(null);
  const [viewPRecords, setViewPRecords] = useState(null);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [patientInfoView, setPatientInfoView] = useState(null);
  const currentDate = new Date();
  const tomorrow = new Date(currentDate);

  tomorrow.setDate(currentDate.getDate() + 1);

  const threeMonthsLater = new Date(currentDate);
  threeMonthsLater.setMonth(currentDate.getMonth() + 3);

  const validRange = {
    start: tomorrow.toISOString(),
    end: threeMonthsLater.toISOString(),
  };

  // const transformEvents = (externalEvents) => {
  //   if (!update) {
  //     return externalEvents.map((event) => ({
  //       title: event.user[0]?.username,
  //       start: event.start,
  //       end: event.end,
  //       color: "red",
  //     }));
  //   } else {
  //     const event = externalEvents[0];
  //     if (event) {
  //       return [
  //         {
  //           title: event.user[0]?.username,
  //           start: event.start,
  //           end: event.end,
  //           color: "red",
  //         },
  //       ];
  //     }
  //     return [];
  //   }
  // };
  const transformEvents = (externalEvents) => {
    return externalEvents.map((event) => {
      const isUpdateAppointment = update && event._id === details?._id; // Check if it's the appointment being updated
      const color = isUpdateAppointment ? "red" : "blue"; // Highlight the appointment being updated

      return {
        title: event.complaints,
        start: event.start,
        end: event.end,
        color,
      };
    });
  };

  useEffect(() => {
    axios.get(`${URL.getDrAppointment}/${doctor._id}`).then((appts) => {
      // console.log(appts.data);
      setAllAppts(appts.data);
      const transformedEvents = transformEvents(appts.data);
      setEvents(transformedEvents);
    });
  }, []);

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr);
    const currentDate = new Date();
    if (clickedDate < currentDate) {
      setErrorMessage("Cannot select past dates for appointments");
      return;
    }
    setSelectedDate(info.dateStr);
    setSelectedSlot(info.dateStr);
    setShowTimeGrid(true);
    setErrorMessage("");
  };
  const handleEventClick = (info) => {
    const startTime = info.event.start;
    const dateObject = new Date(startTime);
    const isoString = dateObject.toISOString();
    // console.log("eventId", isoString);
    // console.log(allAppts[0].start);
    const selectedAppt = allAppts.filter((appt) => {
      return appt.start === isoString;
    });
    // console.log('selectedAppt',selectedAppt)
    if (user.role === "doctor") {
      // Fetch patient details based on the event data (event.id or event.otherUniqueIdentifier)
      // Display the patient details to the doctor
      // You might use a modal or another component to show the patient details
      // Example: Show patient name, complaints, etc.
      setPatientDetailsView(true);
      setShowTimeGrid(false);
      setSelectedAppt(selectedAppt);
      // alert("Doctor: Display patient details here");
    } else {
      // For other roles (e.g., patient or admin), show a message or handle differently
      alert("This slot is already booked.");
    }
  };

  const handleSlotClick = (info) => {
    const clickedTime = new Date(info.dateStr);
    const localOffset = clickedTime.getTimezoneOffset();
    const localTime = new Date(clickedTime.getTime() - localOffset * 60000);

    setSelectedSlot(localTime.toISOString());
  };

  const handleBackToMonth = () => {
    setShowTimeGrid(false);
    setSelectedSlot(null);
    setPatientInfoView(false);
    setViewPRecords(false)
    setCreatePRecords(false)
  };
  function creatAppt() {
    const slotStartTime = new Date(selectedSlot);
    const slotEndTime = new Date(slotStartTime.getTime() + 20 * 60000);
    const apptDetails = {
      user: user._id,
      department: selectedDept._id,
      doctor: doctor._id,
      start: slotStartTime.toISOString(),
      end: slotEndTime.toISOString(),
      complaints: complaints,
    };
    if (complaints === "") {
      alert("Enter a complaint to book an appointment");
    }
    console.log(complaints);
    axios
      .post(URL.createAppointment, apptDetails)
      .then((response) => {
        console.log(response.data);
        axios.get(`${URL.getDrAppointment}/${doctor._id}`).then((appts) => {
          // try{
          const transformedEvents = transformEvents(appts.data);
          setEvents(transformedEvents);
          setShowTimeGrid(false);
          // sendEmail();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function editAppt() {
    const slotStartTime = new Date(selectedSlot);
    const slotEndTime = new Date(slotStartTime.getTime() + 20 * 60000);
    axios
      .patch(`${URL.patientUpdateAppt}/${apptId}`, {
        slotStartTime,
        slotEndTime,
      })
      .then((response) => {
        setShowTimeGrid(false);
        if (updateCallback) {
          updateCallback();
        }
        setView((prevState) => ({
          ...prevState,
          detailView: false,
          updateViewAppt: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const areDatesEqual = (date1, date2) => {
    const formattedDate1 = new Date(date1).toISOString();
    const formattedDate2 = new Date(date2).toISOString();
    return formattedDate1 === formattedDate2;
  };

  const renderDateEventContent = (eventInfo) => {
    console.log(eventInfo.event.title);
    return (
      <>
        {user.role === "doctor" && <p>Title: {eventInfo.event.title}</p>}
        {update &&
        details &&
        areDatesEqual(eventInfo.event.start, details.start) ? (
          <p style={{ color: "purple" }}>Your Appointment</p>
        ) : (
          <></>
        )}
      </>
    );
  };

  const renderTimeEventContent = (eventInfo) => {
    return (
      <>
        {user.role === "doctor" && <p>Title: {eventInfo.event.title}</p>}
        {update &&
        details &&
        areDatesEqual(eventInfo.event.start, details.start) ? (
          <p style={{ color: "purple" }}>Your Appointment</p>
        ) : (
          <></>
        )}
      </>
    );
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
  function viewRecords() {
    setViewPRecords(true);
    setPatientInfoView(false)
    setCreatePRecords(false)
  }
  function createRecords() {
    setCreatePRecords(true);
    setViewPRecords(false)
    setPatientInfoView(false)
  }
  function viewPatientInfo() {
    setPatientInfoView(true);
    setViewPRecords(false)
    setCreatePRecords(false)

  }
  return (
    <div className="fullcalendar-DCC">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {patientDetailsView ? (
        <div>
          <button onClick={viewRecords}>View Past Records</button>
          <button onClick={createRecords}>Create a new Record</button>
          <button onClick={viewPatientInfo}>View Patient Details</button>
          <button
            onClick={() => {
              setPatientDetailsView(false);
            }}
          >
            Back to Calendar
          </button>
        </div>
      ) : !showTimeGrid ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          // eventBackgroundColor='red'
          eventContent={renderDateEventContent}
          weekends={false}
          hiddenDays={[0, 6]}
          validRange={validRange}

          // Other props as needed
        />
      ) : (
        <div className="back-to-month">
          {user.role === "patient" && (
            <input
              name="complaints"
              onChange={(e) => {
                setComplaints(e.target.value);
              }}
            />
          )}
          <h4>Selected Time: {convertTo12HourFormat(selectedSlot)}</h4>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            timeZone="UTC+2"
            initialView="timeGridDay"
            initialDate={selectedDate}
            slotMinTime="08:00:00"
            slotMaxTime="17:00:00"
            slotDuration="00:20:00"
            slotLabelInterval="00:20:00"
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              omitZeroMinute: true,
            }}
            slotEventOverlap={false}
            dateClick={handleSlotClick}
            selectable={true}
            events={events}
            eventContent={renderTimeEventContent}
            eventDisplay="block"
            eventClick={handleEventClick}
            // Other props as needed
          />
        </div>
      )}
      {update
        ? selectedSlot && (
            <button
              className="change-appointment"
              onClick={editAppt}
              disabled={!selectedSlot}
            >
              <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 21H21"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15.3097 5.30981L18.7274 8.72755"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          )
        : selectedSlot && (
            <div>
              {user.role === "patient" && (
                <button
                  className="book-appointment"
                  onClick={creatAppt}
                  disabled={!selectedSlot}
                >
                  <svg
                    width="100px"
                    height="100px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke-width="1.5"
                    ></path>{" "}
                    <path
                      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>
              )}
              {patientDetailsView && createPRecords && (
                <CreatePatientRecord
                  setPatientDetailsView={setPatientDetailsView}
                  setCreatePRecords={setCreatePRecords}
                  selectedAppt={selectedAppt}
                />
              )}
              {patientDetailsView && viewPRecords && (
                <ViewPatientRecord
                  setPatientDetailsView={setPatientDetailsView}
                  setViewPRecords={setViewPRecords}
                  selectedAppt={selectedAppt}
                />
              )}
              {patientDetailsView && patientInfoView && (
                <PatientInfo
                  setPatientDetailsView={setPatientDetailsView}
                  selectedAppt={selectedAppt}
                />
              )}
              {!patientDetailsView && (
                <button className="back" onClick={handleBackToMonth}>
                  Back to Month
                </button>
              )}
            </div>
          )}
    </div>
  );
};

export default DoctorCalendarComponent;
