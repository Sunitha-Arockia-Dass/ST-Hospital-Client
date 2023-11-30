import { NavLink, useNavigate } from "react-router-dom"
import PatientApptDetails from "../../components/PatientApptDetails"
import Doctor from "../../components/Doctor"
import AdminPage from '../admins/AdminPage'
import PatientGPracticeDetails from "../../components/PatientGPracticeDetails"
import PatientPersonalInfo from "../../components/PatientPersonalInfo"
import { AuthContext } from "../../context/auth.context"
import { useContext, useState, useEffect } from "react"

function Account() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div id="account" className="dpt-page">


      {user.role === "patient" && (
        <>                
          <div className="main-frame">

            <div className="first-block gradient-bg">
              <PatientPersonalInfo />
              <PatientGPracticeDetails />
            </div>

            <div className="second-block gradient-bg">
              <PatientApptDetails />
            </div>

          </div>
        </>
      )}
      <div className="">
        {user.role === "doctor" && <Doctor />}
        {user.role === "admin" && <AdminPage />}
      </div>

    </div>

  )
}

export default Account
