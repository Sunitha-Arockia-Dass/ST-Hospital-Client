import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import CreateDepartment from '../../components/CreateDepartment'
import CreateDoctor from '../../components/CreateDoctor'


function AdminPage() {
  const [createDoctorView, setCreateDoctorView] = useState(false);
  const [createDepartmentView, setCreateDepartmentView] = useState(false);
  function createDoctor() {
    setCreateDoctorView(true);
  }
  function createDepartment() {
    setCreateDepartmentView(true);
  }
  console.log(createDepartmentView)

  return (
    <div>
      No, I am the ADMIN !!! Hello
      <button onClick={createDoctor}>Create Doctor</button>
      <button onClick={createDepartment}>Create Department</button>
      {createDoctorView && <CreateDoctor />}
      {createDepartmentView && <CreateDepartment />}
    </div>
  );
}

export default AdminPage;
