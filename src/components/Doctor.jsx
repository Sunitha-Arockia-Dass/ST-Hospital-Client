import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import DoctorCalendarComponent from "./DoctorCalendarComponent";
function Doctor() {
  const { user } = useContext(AuthContext);
console.log('user',user)
  return (
    <div>
      <h1>
        Welcome Dr.{user.firstname} {user.lastname}
      </h1>
      <DoctorCalendarComponent doctor={user.doctor} />
    </div>
  );
}

// {
//     setView,
//     updateCallback,
//     details,
//     doctor,
//     selectedDept,
//     update,
//   }

export default Doctor;
