import { useEffect } from 'react';
import io from 'socket.io-client';

const DoctorChatComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:5005'); // Replace with your server URL

    // Example: Sending a message from one doctor to another
    const sendMessage = () => {
      const message = 'Hello, fellow doctor!';
      socket.emit('doctorMessage', message);
    };

    // Listen for incoming messages
    socket.on('doctorMessage', (message) => {
      // Handle received messages here
      console.log('Received message:', message);
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when component unmounts
    };
  }, []);

  return (
    <div>
      {/* Your chat UI and logic */}
    </div>
  );
};

export default DoctorChatComponent;
