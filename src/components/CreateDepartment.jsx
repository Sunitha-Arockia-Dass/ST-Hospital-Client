import axios from "axios";
import URL from "../links/links.json";
import { useState, useEffect } from "react";

function CreateDepartment({ create, id, setCreateDept, setDeptView }) {
  const [deptToUpdate, setDeptToUpdate] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${URL.departments}/${id}`)
      .then((foundDepartments) => {
        setDeptToUpdate(foundDepartments.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, []);

  function createDept(e) {
    e.preventDefault();
    const deptData = {
      name: e.target.name.value,
      image: e.target.image.value,
      description: e.target.description.value,
    };
    axios
      .post(URL.addDepartment, deptData)
      .then((response) => {
        setCreateDept(false);
        setDeptView(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }
  function updateDept(e) {
    e.preventDefault();
    const updateDept = {
      name: e.target.name.value,
      image: e.target.image.value,
      description: e.target.description.value,
    };
    axios
      .put(`${URL.updateDept}/${id}`, updateDept)
      .then((response) => {
        setCreateDept(false);
        setDeptView(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <div className="manage-dpt">
      {create ? (
        <div>
          <h5>Create Department</h5>
          <form onSubmit={createDept}>
            <input type="text" name="name" placeholder="department's name" />

            <input type="text" name="image" placeholder="department's image" />

            <textarea
              name="description"
              placeholder="department's description"
            />

            <button className="form" type="submit">
              Create
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h5>Update Department</h5>
          <form onSubmit={updateDept}>
            <input
              type="text"
              name="name"
              placeholder="department's name"
              defaultValue={deptToUpdate.name}
            />

            <input
              type="text"
              name="image"
              placeholder="department's image"
              defaultValue={deptToUpdate.image}
            />

            <label>Description:</label>
            <textarea
              name="description"
              placeholder="department's description"
              defaultValue={deptToUpdate.description}
            />

            <button className="form" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreateDepartment;
