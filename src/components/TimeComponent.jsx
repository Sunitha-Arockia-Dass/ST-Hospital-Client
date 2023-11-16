import { useEffect, useState } from 'react';

const TimeComponent = ({ selectedDate }) => {
  // Function to generate time slots from 8 AM to 5 PM at 20-minute intervals
  const generateTimeSlots = () => {
    const startTime = new Date(selectedDate);
    startTime.setHours(8, 0, 0, 0); // Set start time to 8 AM
    const endTime = new Date(selectedDate);
    endTime.setHours(17, 0, 0, 0); // Set end time to 5 PM

    const timeSlots = [];
    while (startTime < endTime) {
      const formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push(formattedTime);
      startTime.setMinutes(startTime.getMinutes() + 20); // Increment time by 20 minutes
    }
    return timeSlots;
  };

  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const generatedTimeSlots = generateTimeSlots();
    setTimeSlots(generatedTimeSlots);
  }, [selectedDate]);

  return (
    <div>
      <h2>Select a Time Slot for {selectedDate}</h2>
      <ul>
        {timeSlots.map((timeSlot, index) => (
          <li key={index}>{timeSlot}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeComponent;