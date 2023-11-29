import { useEffect, useState, useContext } from "react";
// import io from "socket.io-client";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import URL from "../links/links.json";

const DoctorChatComponent = () => {
  // const { user } = useContext(AuthContext);
  // const [isDoctor, setIsDoctor] = useState(null);
  // const [doctors, setDoctors] = useState(null);
  // const [receivingDrId, setReceivingDrId] = useState(null);
  // const [outgoingMsg, setOutgoingMsg] = useState("");
  // const [incomingMsgs, setIncomingMsgs] = useState([]);
  // const [socket, setSocket] = useState();
  // // const [socketId, setSocketId] = useState(null);

  // // useEffect(() => {
  // //   const socket = io.connect("http://localhost:5005");
  // //   setSocket(socket);
  // // }, []);
  // // console.log('socket.id',socket.id)

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5005/usersocket")
  //     .then((response) => {
  //       console.log(response.data);
  //       setDoctors(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
  // }, []);
  // useEffect(() => {
  //   if (user?.role === "doctor") {
  //     setIsDoctor(true);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const socket = io("http://localhost:5005");
  //   setSocket(socket);
  //   console.log("Attaching listener for doctorMessage");
  //   // Listen for incoming messages
  //   console.log("socket.id", socket.id);

  //   socket.on("testMessage", (receivingMessage) => {
  //     console.log("receiving messages 2");
  //     console.log("Received message:", receivingMessage);
  //     setIncomingMsgs((prevMessages) => [...prevMessages, receivingMessage]);
  //   });

  //   // return () => {
  //   //   socket.off("doctorMessage"); // Clean up the listener when component unmounts
  //   //   socket.disconnect(); // Disconnect the socket when component unmounts
  //   // };
  // }, []);

  // const sendMessage = () => {
  //   console.log("send message function called");
  //   console.log("socket.id", socket.id);
  //   const messageData = {
  //     recipientId: receivingDrId,
  //     message: outgoingMsg,
  //     userId: user._id,
  //   };
  //   console.log(messageData.message);
  //   console.log(messageData.recipientId);
  //   console.log(messageData.userId);
  //   socket.emit("privateMessage", messageData);
  // };

  // function getMsg(e) {
  //   setOutgoingMsg(e.target.value);
  // }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (outgoingMsg.trim() !== "") {
  //     sendMessage();
  //   }
  // }
  // function handleDoctorChange(e) {
  //   const selectedDoctorId =
  //     e.target.options[e.target.selectedIndex].getAttribute("data-doctor-id");
  //   setReceivingDrId(selectedDoctorId);
  // }

  // return (
  //   <div className="chat-component">
  //     {/* {isDoctor && ( */}
  //     <form onSubmit={handleSubmit}>
  //       <select name="receivingDr" onChange={(e) => handleDoctorChange(e)}>
  //         {doctors?.map((doctor) => {
  //           return (
  //             <option
  //               data-doctor-id={doctor.socketId}
  //               value={doctor.user.firstname}
  //               key={doctor._id}
  //             >
  //               {doctor.user.firstname} {doctor.user.lastname}
  //             </option>
  //           );
  //         })}
  //       </select>
  //       <input
  //         name="message"
  //         value={outgoingMsg}
  //         onChange={getMsg}
  //         placeholder="Type your message..."
  //       />
  //       {/* <input value={`The other one:${incomingMsgs}`} /> */}
  //       <button type="submit">Send</button>
  //     </form>
  //     {/* )} */}
  //   </div>
  // );
};

export default DoctorChatComponent;
