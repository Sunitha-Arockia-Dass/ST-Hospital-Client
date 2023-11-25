import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import URL from "../links/links.json";
import CreateDepartment from "./CreateDepartment";

function AdminDepartmentPage() {
  const [createDept, setCreateDept] = useState(null);
  const [updateDept, setUpdateDept] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [deptView, setDeptView] = useState(true);
  const [deptId,setDeptId]=useState()
  useEffect(() => {
    axios.get(URL.departments).then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    });
  }, [deptView]);
  const updateDepartment = (id) => {
    setDeptView(false);
    setUpdateDept(true);
    setDeptId(id)
  };

  const deleteDept = (id) => {
    axios
      .delete(`${URL.deleteDept}/${id}`)
      .then((response) => {
        console.log("successfully deleted", response.data);
        setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department._id !== id)
      );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div>
      <h1>Admin Department Page</h1>
      <button
        onClick={() => {
          setCreateDept(true), setDeptView(false);
        }}
      >
        Add
      </button>
      {deptView &&
        departments?.map((department) => {
          return (
            <div key={department._id}>
              <fieldset>
                <legend>
                  <h4>{department.name}</h4>
                </legend>
                <p>{department.description}</p>
                <img src={department.image} alt="Department icon" />
                <button
                  onClick={() => {
                    updateDepartment(department._id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteDept(department._id);
                  }}
                >
                  Delete
                </button>
              </fieldset>
            </div>
          );
        })}
      {createDept && <CreateDepartment create={true} setDeptView={setDeptView} setCreateDept={setCreateDept} id={""} />}
      {updateDept && <CreateDepartment create={false} setDeptView={setDeptView} setCreateDept={setUpdateDept} id={deptId} />}
    </div>
  );
}

export default AdminDepartmentPage;
