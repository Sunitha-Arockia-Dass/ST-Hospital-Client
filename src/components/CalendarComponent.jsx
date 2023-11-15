import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: '2023-11-15',
      description: 'Description for Event 1',
      color: 'blue'
    },
    {
      title: 'Event 2',
      start: '2023-11-16',
      description: 'Description for Event 2',
      color: 'green'
    },
    // Add more events as needed
  ]);

  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();

      calendar.on("dateClick", (info) => {
        console.log("Date clicked:", info.dateStr);
        setSelectedDate(info.dateStr);
      });
    }
  }, []);

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => {
    return (
      <>
        <p>{eventInfo.event.title}</p>
        <p>Description: {eventInfo.event.extendedProps.description}</p>
        <p>Color: {eventInfo.event.extendedProps.color}</p>
      </>
    );
  }}

        // Other props as needed
      />
      {selectedDate && (
        <div>
          <h2>Time Info for {selectedDate}</h2>
          {/* Display time-related information or chart here */}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
