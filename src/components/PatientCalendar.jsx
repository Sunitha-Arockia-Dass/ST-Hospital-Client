import { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";

function PatientCalendar({ details }) {
  const { doctor, department, start, end, id } = details[0];
  console.log(start);
  // console.log(_id)

  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showTimeGrid, setShowTimeGrid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const transformEvents = (externalEvents) => {
    const event = externalEvents[0];
    if (event) {
      return [{
        title: event.user[0].username,
        start: event.start,
        end: event.end,
        color: "red",
      }];
    }
    return [];
  };

  useEffect(() => {
    // Assuming details is an array of events or appointments
    const transformedDetails = transformEvents(details); // Transform single event or array of events
    console.log(transformedDetails)
    setEvents(transformedDetails);
  }, [details]);
  
  
  const handleDateClick = (info) => {
    console.log(info.dateStr)
    setSelectedDate(info.dateStr);
    setSelectedSlot(info.dateStr);
    setShowTimeGrid(true);
  };

  const handleSlotClick = (info) => {
    const clickedTime = new Date(info.dateStr); // Get the clicked time
    const localOffset = clickedTime.getTimezoneOffset(); // Get local timezone offset in minutes
    const localTime = new Date(clickedTime.getTime() - localOffset * 60000); // Adjust the time to local timezone
    console.log(localTime.toISOString()); // Log the adjusted time
    setSelectedSlot(localTime.toISOString());
  };

  const handleBackToMonth = () => {
    setShowTimeGrid(false);
    setSelectedSlot(null);
  };
  const renderEventContent = (eventInfo) => {
    // console.log(eventInfo);
    return (
      <>
        {/* {user.role === "doctor" && <p>TiTle:{eventInfo.event.title}</p>} */}
        {<p>Appt time:{convertTo12HourFormat(start)}</p>}
        {/* {/* <p>Description: {eventInfo.event.extendedProps.description}</p> */}
        {/* <p>Color: {eventInfo.event.extendedProps.color}</p>  */}
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
      {selectedSlot &&
        {
          /* <button onClick={creatAppt} disabled={!selectedSlot}>
              Book an Appointment
            </button> */
        }}
      {!showTimeGrid ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          // eventBackgroundColor='red'
          eventContent={renderEventContent}
          weekends={false}
          hiddenDays={[0, 6]}

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
            eventContent={renderEventContent}
            eventDisplay="block"
            // Other props as needed
          />
        </div>
      )}
    </div>
  );
}

export default PatientCalendar;
