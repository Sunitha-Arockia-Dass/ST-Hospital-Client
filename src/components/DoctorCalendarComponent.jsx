import { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";

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
      const color = isUpdateAppointment ? "blue" : "red"; // Highlight the appointment being updated

      return {
        title: event.user[0]?.username,
        start: event.start,
        end: event.end,
        color,
      };
    });
  };

  useEffect(() => {
    axios.get(`${URL.getDrAppointment}/${doctor._id}`).then((appts) => {
      // console.log(appts.data);
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
    alert("This slot is already booked.");
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
    };
    axios
      .post(URL.createAppointment, apptDetails)
      .then((response) => {
        axios.get(`${URL.getDrAppointment}/${doctor._id}`).then((appts) => {
          // try{
          const transformedEvents = transformEvents(appts.data);
          setEvents(transformedEvents);
          setShowTimeGrid(false);
          sendEmail();
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
    console.log("eventInfo.event.start", eventInfo.event.start);
    console.log("details.start", details.start);
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
  return (
    <div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {update
        ? selectedSlot && (
            <button onClick={editAppt} disabled={!selectedSlot}>
              Change the Appointment
            </button>
          )
        : selectedSlot && (
            <button onClick={creatAppt} disabled={!selectedSlot}>
              Book an Appointment
            </button>
          )}
      {!showTimeGrid ? (
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
        <div>
          <button onClick={handleBackToMonth}>Back to Month</button>
          <h4>Selected Time:{convertTo12HourFormat(selectedSlot)}</h4>
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
    </div>
  );
};

export default DoctorCalendarComponent;
