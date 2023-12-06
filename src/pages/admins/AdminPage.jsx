import { useContext, useState, useLayoutEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"
import AdminDoctorPage from '../../components/AdminDoctorPage'
import AdminDepartmentPage from '../../components/AdminDepartmentPage'
import CreateAdmin from '../../components/CreateAdmin'
import gsap from "gsap"


function AdminPage() {
  const [doctorView, setDoctorView] = useState(false);
  const [departmentView, setDepartmentView] = useState(false);
  const [selectDrView, setSelectDrView] = useState(false);
  const [createAdmin, setCreateAdmin] = useState(false)
  function viewDoctor() {
    setDoctorView(true);
    setDepartmentView(false);
    setSelectDrView(false);
    setCreateAdmin(false)

  }
  function viewDepartment() {
    setDepartmentView(true);
    setDoctorView(false);
    setSelectDrView(false);
    setCreateAdmin(false)

  }
  function addDrCredentials() {
    setSelectDrView(true);
    setDepartmentView(false);
    setDoctorView(false);
    setCreateAdmin(false)
  }

  function addAdminCredentials() {
    setCreateAdmin(true)
    setDepartmentView(false);
    setDoctorView(false);
    setSelectDrView(false);
  }

  // AccountAdmin Gsap Animation //////////////////////////////////////////
  useLayoutEffect(() => {
    const tlAccountAdmin = gsap.timeline({ defaults: { duration: .25, ease: "power1.out" } })
    tlAccountAdmin
      .fromTo("#account h3", { opacity: 0 }, { opacity: 1, ease: "bounce" })
      .fromTo("#account .first-block", { x: "-50px" }, { x: 0, duration: .1 })
      .fromTo(".first-block button", { opacity: 0, rotateY: -90 }, { opacity: 1, rotateY: 0 }, "<")
      .fromTo("#account .second-block", { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
      .fromTo(".second-block button", { opacity: 0, rotateY: -90 }, { opacity: 1, rotateY: 0 })
  })

  return (
    <div id="account" className="dpt-page">
      <div className="main-frame">
        <h3>Administration Page
          <h5>Great master, what do you want to update?</h5>
        </h3>

        <div className="first-block gradient-bg">
          <button className="inside-block back" onClick={viewDepartment}><b>Manage Departments</b></button>
          <button className="inside-block back" onClick={viewDoctor}><b>Manage Doctors</b></button>
          <button className="inside-block back" onClick={addDrCredentials}><b>Create Doctor Credentials</b></button>
          <button className="inside-block back" onClick={addAdminCredentials}><b>Create Admin Credentials</b></button>
        </div>

        <div className="second-block gradient-bg">
          {departmentView && <AdminDepartmentPage setDepartmentView={setDepartmentView} />}
          {doctorView && <AdminDoctorPage createCredentials={false} setDoctorView={setDoctorView} setSelectDrView={setSelectDrView} />}
          {selectDrView && <AdminDoctorPage createCredentials={true} setDoctorView={setDoctorView} setSelectDrView={setSelectDrView} />}
          {createAdmin && <CreateAdmin setCreateAdmin={setCreateAdmin} />}
        </div>

      </div>
    </div>
  );
}
export default AdminPage;
