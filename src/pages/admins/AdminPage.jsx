import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import AdminDoctorPage from '../../components/AdminDoctorPage'
import AdminDepartmentPage from '../../components/AdminDepartmentPage'
import CreateAdmin from '../../components/CreateAdmin'


function AdminPage() {
  const [doctorView, setDoctorView] = useState(false);
  const [departmentView, setDepartmentView] = useState(false);
  const [selectDrView,setSelectDrView] = useState(false);
  const [createAdmin,setCreateAdmin] =useState(false)
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

function addAdminCredentials(){
  setCreateAdmin(true)
  setDepartmentView(false);
  setDoctorView(false);
  setSelectDrView(false);

}

  return (
    <div className="dpt-page">
      <h3>Administration Page</h3>
      <h5>Great master, what do you want to update?</h5>

      <button className="back" onClick={viewDoctor}>Doctors</button>
      <button className="back" onClick={viewDepartment}>Departments</button>
      <button className="back" onClick={addDrCredentials}>Create Doctor Credentials</button>
      <button className="back" onClick={addAdminCredentials}>Create Admin Credentials</button>
      {doctorView && <AdminDoctorPage createCredentials={false} setDoctorView={setDoctorView} setSelectDrView={setSelectDrView}/>}
      {selectDrView && <AdminDoctorPage createCredentials={true} setDoctorView={setDoctorView} setSelectDrView={setSelectDrView}/>}
      {departmentView && <AdminDepartmentPage setDepartmentView={setDepartmentView}/>}
      {createAdmin && <CreateAdmin setCreateAdmin={setCreateAdmin}/>}
    </div>
  );
}
export default AdminPage;
