import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import AdminDoctorPage from '../../components/AdminDoctorPage'
import AdminDepartmentPage from '../../components/AdminDepartmentPage'


function AdminPage() {
  const [doctorView, setDoctorView] = useState(false);
  const [departmentView, setDepartmentView] = useState(false);
  function viewDoctor() {
    setDoctorView(true);
  }
  function viewDepartment() {
    setDepartmentView(true);
  }

  return (
    <div>
      No, I am the ADMIN !!! Hello
      <button onClick={viewDoctor}>Doctors</button>
      <button onClick={viewDepartment}>Departments</button>
      {doctorView && <AdminDoctorPage setDoctorView={setDoctorView}/>}
      {departmentView && <AdminDepartmentPage setDepartmentView={setDepartmentView}/>}
    </div>
  );
}

export default AdminPage;
