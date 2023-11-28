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
    <div id="account" className="full center-frame dpt-page">
    
      {user.role === "patient" && (
        <>
        <div className="container">
        <h3>{user.firstname} {user.lastname}, Welcome to your account.</h3>        
        </div>
        


        <div className="half-frame">
        <div className="patient-detail">
          <PatientApptDetails />
          <PatientGPracticeDetails />
          <PatientPersonalInfo />
        </div>
        </div>
        </>
      )}
      <div className="half-frame">
      {user.role === "patient" && <Doctor />}
      {user.role === "admin" && navigate("/admin")}
      </div>
      
    </div>
    
  );
}

export default Account;
