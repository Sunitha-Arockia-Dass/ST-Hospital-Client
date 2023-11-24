import { useState, useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import URL from "../links/links.json";
import { SMTPClient } from 'emailjs'
import { TextEncoder, TextDecoder } from 'fastestsmallesttextencoderdecoder';

const DoctorCalendarComponent = ({
  setView,
  updateCallback,
  details,
  doctor,
  selectedDept,
  update,
}) => {
  console.log(update);
  const apptId = details?._id;
  const { user } = useContext(AuthContext);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showTimeGrid, setShowTimeGrid] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // Use TextEncoder and TextDecoder here or in other parts of your component
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const encoded = encoder.encode('Your string to encode');
    const decoded = decoder.decode(encoded);
    console.log(decoded);
  }, []);
  const transformEvents = (externalEvents) => {
    if (!update) {
      return externalEvents.map((event) => ({
        title: event.user[0]?.username,
        start: event.start,
        end: event.end,
        color: "red",
      }));
    } else {
      const event = externalEvents[0];
      if (event) {
        return [
          {
            title: event.user[0]?.username,
            start: event.start,
            end: event.end,
            color: "red",
          },
        ];
      }
      return [];
    }
  };

  useEffect(() => {
    axios.get(`${URL.getDrAppointment}/${doctor._id}`).then((appts) => {
      // console.log(appts.data);
      const transformedEvents = transformEvents(appts.data);
      setEvents(transformedEvents);
    });
  }, []);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setSelectedSlot(info.dateStr);
    setShowTimeGrid(true);
  };

  const handleSlotClick = (info) => {
    const clickedTime = new Date(info.dateStr); // Get the clicked time
    const localOffset = clickedTime.getTimezoneOffset(); // Get local timezone offset in minutes
    const localTime = new Date(clickedTime.getTime() - localOffset * 60000); // Adjust the time to local timezone

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
        axios.get(`${URL.getDrAppointment}/${doctor._id}`).then(async(appts) => {
          try{ const transformedEvents = transformEvents(appts.data);
          setEvents(transformedEvents);
          setShowTimeGrid(false);
          const mailDetails = {
            to_name: user.name,
            email: user.email,
            from_name: "ST Hospital",
            message: "Hello",
          };
          const client = new SMTPClient({
            user: 'ST Hospital',
            password: import.meta.env.SERVICE_PWD,
            host: 'smtp.sthospital01@gmail.com',
            ssl: true,
          });
           const message = await client.sendAsync(
            {
              text: 'i hope this works',
              from: 'you <sthospital01@gmail.com>',
              to: `${user.username} <${user.email}>`,
              cc: 'else <else@your-email.com>',
              subject: 'testing emailjs',
            })
            console.log('message sent successfully',message)
          }
            catch(err)  {
              console.error('Error sending message:', err);
            }
            
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
  const renderDateEventContent = (eventInfo) => {
    return (
      <>
        {user.role === "doctor" && <p>TiTle:{eventInfo.event.title}</p>}
        {update ? <p style={{ color: "purple" }}>Your Appointment</p> : <></>}
      </>
    );
  };
  const renderTimeEventContent = (eventInfo) => {
    return (
      <>
        {user.role === "doctor" && <p>TiTle:{eventInfo.event.title}</p>}
        {update ? <>Your Appointment</> : <></>}
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
            // Other props as needed
          />
        </div>
      )}
    </div>
  );
};

export default DoctorCalendarComponent;
