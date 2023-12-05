import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import URL from "../links/links.json";
import CreateDepartment from "./CreateDepartment";

function AdminDepartmentPage({ setDepartmentView }) {
  const [createDept, setCreateDept] = useState(null);
  const [updateDept, setUpdateDept] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [deptView, setDeptView] = useState(true);
  const [deptId, setDeptId] = useState()
  const [errorMessage, setErrorMessage] = useState(undefined)

  useEffect(() => {
    axios.get(URL.departments).then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    })
    .catch((error) => {
      setErrorMessage(error.response.data.message);
    })
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
        setErrorMessage(error.response.data.message);
      })
  };
  return (
    <div className="dpt-page">     
        <h4 className="admin">Admin Department Page</h4>
      <div className="all-dpt">
      <div className="admin one-dpt">
        <button className="back admin" onClick={() => { setDepartmentView(false) }} >↩ Back</button>
        <button className="back admin"
          onClick={() => {
            setCreateDept(true), setDeptView(false);
          }}
        >
          <b>Add +</b>
        </button>
        </div>
        {deptView &&
          departments?.map((department) => {
            return (
              <div className="admin one-dpt" key={department._id}>
                <fieldset className="fieldset">
                  <legend>
                    <h4>{department.name}</h4>
                  </legend>
                  <p>{department.description}</p>
                  <div className="dpt-img">
                    <img src={department.image} alt="Department icon" />
                  </div>
                </fieldset>
                <button className="back"
                  onClick={() => {
                    updateDepartment(department._id);
                  }}
                >
                  Update
                </button>
                <button className="back"
                  onClick={() => {
                    deleteDept(department._id);
                  }}
                >
                  Delete
                </button>
                
              </div>
            );
          })}
        {createDept && <CreateDepartment create={true} setDeptView={setDeptView} setCreateDept={setCreateDept} id={""} />}
        {updateDept && <CreateDepartment create={false} setDeptView={setDeptView} setCreateDept={setUpdateDept} id={deptId} />}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}

export default AdminDepartmentPage;
