import { useState, useContext } from "react";
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

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setSelectedSlot(info.dateStr);
    setShowTimeGrid(true);
  };

  const handleSlotClick = (info) => {
    // console.log('slotClick',info.date)
    // console.log("handleSlotClick", new Date(info.dateStr).toISOString());
    setSelectedSlot(new Date(info.dateStr).toISOString());
  };

  const handleBackToMonth = () => {
    setShowTimeGrid(false);
    setSelectedSlot(null);
  };
  function creatAppt() {
    const apptDetails = {
      user: (user._id),
      department: selectedDept._id,
      doctor: doctor._id,
      start: selectedSlot,
    };
    console.log(apptDetails)
    axios.post(URL.createAppointment,apptDetails).then((response) => {
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <div>
{selectedSlot && (
      <button onClick={creatAppt} disabled={!selectedSlot}>
        Book an Appointment
      </button>
    )}      {!showTimeGrid ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          // Other props as needed
        />
      ) : (
        <div>
          <button onClick={handleBackToMonth}>Back to Month</button>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
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

            // Other props as needed
          />
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
