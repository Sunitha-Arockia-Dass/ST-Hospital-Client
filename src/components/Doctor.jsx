import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import DoctorCalendarComponent from "./DoctorCalendarComponent";
function Doctor() {
  const { user } = useContext(AuthContext);
  return (
    <div id="account" className="dpt-page">
      <div className="main-frame">
        <h3>
          Dr {user.firstname} {user.lastname}
          <h5>Great doctor, what do you want to check ?</h5>
        </h3>

        <DoctorCalendarComponent doctor={user.doctor} />
      </div>
    </div>
  );
}

export default Doctor;
