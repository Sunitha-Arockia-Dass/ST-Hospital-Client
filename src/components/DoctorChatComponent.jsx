import { useEffect, useState, useContext, useRef } from "react";
import io from "socket.io-client";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import {socket} from '../Socket'
import URL from "../links/links.json";
// const socket = io.connect("http://localhost:5005");
const DoctorChatComponent = () => {
  const { user } = useContext(AuthContext);
  const [isDoctor, setIsDoctor] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [outgoingMsg, setOutgoingMsg] = useState("");
  const [incomingMsgs, setIncomingMsgs] = useState([]);
  const selectRef = useRef(null);
  const defaultReceivingDrId = doctors && doctors.length > 0 ? doctors[0].socketId : null;
  const [receivingDrId, setReceivingDrId] = useState(defaultReceivingDrId);
  
  console.log("socket.id", socket.id);
  console.log("receivingDrId", receivingDrId);
  // console.log("doctors[0].socketId", doctors[0].socketId);

  // const [socket, setSocket] = useState();
  // const [socketId, setSocketId] = useState(null);

  // useEffect(() => {
  //   const socket = io.connect("http://localhost:5005");
  //   setSocket(socket);
  // }, []);
  // console.log('socket.id',socket.id)
  // useEffect(()=>{
  //   setTimeout(() => {

  //     socket.emit('diogo', {msg: '123'})
  //  socket.on('diogo',(msg)=>{
  //   console.log(msg)
  //  })
  //  }, 2000)
  // },[])
  useEffect(() => {
    axios
      .get("http://localhost:5005/usersocket")
      .then((response) => {
        console.log(response.data);
        console.log(response.data[0].socketId);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);
  useEffect(() => {
    if (user?.role === "doctor") {
      setIsDoctor(true);
    }
  }, [user]);

  useEffect(() => {
    // const socket = io("http://localhost:5005");
    // setSocket(socket);
    console.log("Attaching listener for doctorMessage");
    // Listen for incoming messages
    console.log("socket.id", socket.id);
    console.log(socket.id);
    socket.on("testMessage", (receivingMessage) => {
      console.log("receiving messages 2");
      console.log("Received message:", receivingMessage);
      setIncomingMsgs((prevMessages) => [...prevMessages, receivingMessage]);
    });
    // socket.on("messageSentConfirmation",(msg)=>{
    //   console.log('msg',msg)
    // })

    
  }, []);

  const sendMessage = () => {
    console.log("send message function called");
    const messageData = {
      recipientId:receivingDrId ,
      message: outgoingMsg,
      userId: user._id,
    };
    console.log(messageData.message);
    console.log(messageData.recipientId);
    console.log(messageData.userId);
    socket.emit("privateMessage", messageData);
  };

  function getMsg(e) {
    setOutgoingMsg(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // getSelectedValue();
    if (outgoingMsg.trim() !== "") {
      sendMessage();
    }
  }
  function handleDoctorChange(e) {
    const selectedDoctorId =
      e.target.options[e.target.selectedIndex].getAttribute("data-doctor-id");
      console.log('selectedDoctorId',selectedDoctorId)
    setReceivingDrId(selectedDoctorId);
  }
  // const getSelectedValue = () => {
  //   const selectedValue = selectRef.current.value;
  //   // Use the selectedValue as needed (e.g., sending a message)
  //   console.log("Selected value:", selectedValue);
  //   setReceivingDrId(selectedValue); // Set the receivingDrId state
  // };

  return (
    <div className="chat-component">
      {isDoctor && (
        <form onSubmit={handleSubmit}>
          <select name="receivingDr" ref={selectRef} onChange={(e) => handleDoctorChange(e)}>
            {doctors?.map((doctor) => {
              return (
                <option
                  data-doctor-id={doctor.socketId}
                  value={doctor.socketId}
                  key={doctor._id}
                >
                  {doctor.user?.firstname} {doctor.user?.lastname}
                </option>
              );
            })}
          </select>
          <input
            name="message"
            value={outgoingMsg}
            onChange={getMsg}
            placeholder="Type your message..."
          />
          <input value={`The other one:${incomingMsgs}`} />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default DoctorChatComponent;
