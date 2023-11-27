import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import CreateDepartment from '../../components/CreateDepartment'
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
    <div className="dpt-page">
      <h3>Administration Page</h3>
      <h5>Great master, what do you want to update?</h5>

      <button className="back" onClick={viewDoctor}>Doctors</button>
      <button className="back" onClick={viewDepartment}>Departments</button>
      {/* {doctorView && <CreateDoctor />} */}
      {departmentView && <AdminDepartmentPage />}
    </div>
  );
}

export default AdminPage;
