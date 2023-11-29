import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "../context/auth.context";

const DoctorChatComponent = () => {
  const { user } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (user?.role === "doctor") {
      setDoctor(true);
    }
  }, [user]);
  useEffect(() => {
    const socket = io("http://localhost:5005"); // Replace with your server URL

    // Example: Sending a message from one doctor to another
    
    // Listen for incoming messages
    socket.on("doctorMessage", (message) => {
      // Handle received messages here
      console.log("Received message:", message);
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when component unmounts
    };
  }, [msg]);
  const sendMessage = () => {
    const socket = io("http://localhost:5005")
    const message = msg;
    socket.emit("doctorMessage", message);
  };

  function getMsg(e) {
    setMsg(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (msg.trim() !== "") {
      sendMessage();
    }
  }
  return (
    <div>
      {doctor && (
        <form onSubmit={handleSubmit}>
          <input
            name="message"
            value={msg}
            onChange={getMsg}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default DoctorChatComponent;
