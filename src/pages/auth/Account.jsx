import { NavLink, useNavigate } from "react-router-dom";
import PatientApptDetails from "../../components/PatientApptDetails";
import Doctor from "../../components/Doctor";
import PatientGPracticeDetails from "../../components/PatientGPracticeDetails";
import PatientPersonalInfo from "../../components/PatientPersonalInfo";
import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";

function Account() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div id="account">
      {user.role === "patient" && (
        <div>
        <h1>This is {user.firstname} {user.lastname} Account</h1>
        <div className="patient-detail">
          <PatientApptDetails />
          <PatientGPracticeDetails />
          <PatientPersonalInfo />
        </div>
        </div>
      )}
      {user.role === "patient" && <Doctor />}
      {user.role === "admin" && navigate("/admin")}
      
    </div>
  );
}

export default Account;
