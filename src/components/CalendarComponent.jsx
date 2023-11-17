import { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";

const CalendarComponent = ({ doctor, selectedDept }) => {
  const { user } = useContext(AuthContext);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showTimeGrid, setShowTimeGrid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appts, setAppts] = useState(null);
  const [events, setEvents] = useState([]);
  const transformEvents = (externalEvents) => {
    return externalEvents.map((event) => ({
      title: event.user[0].username,
      // description: event.description,
      start: event.start,
      end: event.end,
      color: "red",
    }));
  };

  useEffect(() => {
    axios.get(`${URL.getDrAppointment}/${doctor._id}`).then((appts) => {
      console.log(appts.data);
      // console.log('patient',appts.data[0].user[0].username)
      const transformedEvents = transformEvents(appts.data);
      console.log();
      setEvents(transformedEvents);
      setAppts(appts.data);
    });
  }, []);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setSelectedSlot(info.dateStr);
    setShowTimeGrid(true);
  };

  // const handleSlotClick = (info) => {
  //   console.log(new Date(info.dateStr).toISOString())
  //   console.log(info.dateStr)

  //   setSelectedSlot(new Date(info.dateStr).toISOString());
  // };
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
  function creatAppt() {
    const filteredAppts = appts?.filter((appt) => {
      const startTime=new Date(appt.start).toISOString()
      return startTime === selectedSlot;
    });
    console.log(filteredAppts);
    // if (filteredAppts.length === 0) {
    //   alert("slot already book");
    // } else {
      const slotStartTime = new Date(selectedSlot);
      const slotEndTime = new Date(slotStartTime.getTime() + 20 * 60000);
      const apptDetails = {
        user: user._id,
        department: selectedDept._id,
        doctor: doctor._id,
        start: slotStartTime.toISOString(),
        end: slotEndTime.toISOString(),
      };
      console.log(apptDetails);
      axios
        .post(URL.createAppointment, apptDetails)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    // }
  }
  const renderEventContent = (eventInfo) => {
    // console.log(eventInfo);
    return (
      <>
        <p>TiTle:{eventInfo.event.title}</p>
        {/* {/* <p>Description: {eventInfo.event.extendedProps.description}</p> */}
        {/* <p>Color: {eventInfo.event.extendedProps.color}</p>  */}
      </>
    );
  };
  return (
    <div>
      {selectedSlot && (
        <button onClick={creatAppt} disabled={!selectedSlot}>
          Book an Appointment
        </button>
      )}{" "}
      {!showTimeGrid ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          // eventBackgroundColor='red'
          eventContent={renderEventContent}

          // Other props as needed
        />
      ) : (
        <div>
          <button onClick={handleBackToMonth}>Back to Month</button>
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
            // Other props as needed
          />
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
