import axios from "axios";
import URL from "../links/links.json";
import { useState, useEffect } from "react";

function CreateDoctor({ create, id, setCreateDoctor, setDrView,setUpdateDr }) {
  const [drToUpdate, setDrToUpdate] = useState({});
  const [dept, setDept] = useState([]);
  const [selectedDept,setSelectedDept]=useState(dept[0]?.name)
  const [deptToUpdate,setDeptToUpdate]=useState({
    name:'',
    id:''
  })
  useEffect(() => {
    axios.get(`${URL.doctors}/${id}`).then((foundDoctors) => {
        console.log('foundDoctors.data',foundDoctors.data.department[0]._id)
      setDrToUpdate(foundDoctors.data);
      setDeptToUpdate({name:foundDoctors.data?.department[0].name,id:foundDoctors.data?.department[0]._id})
    });
  }, [id]);
  useEffect(() => {
    axios.get(URL.departments).then((foundDepartments) => {
      setDept(foundDepartments.data);
      setSelectedDept(foundDepartments.data[0]._id)

    });
  }, []);

  function createDr(e) {
    e.preventDefault();
   
    const drData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      image: e.target.image.value,
      department: selectedDept,
      position: e.target.position.value,
    };

    console.log("department", drData);
        axios
          .post(URL.addDoctor, drData)
          .then((response) => {
            console.log(response.data);
            setCreateDoctor(false);
            setDrView(true);
          })
          .catch((error) => {
            console.log(error);
          });

  }
  function handleDepartmentChange(e) {
    const selectedDepartmentId = e.target.options[e.target.selectedIndex].getAttribute('data-department-id');
    setSelectedDept(selectedDepartmentId);
  }
  function updateDr(e) {
    e.preventDefault();
    const selectedDepartmentId = e.target.department.value;
    const updatedDepartmentId = selectedDepartmentId !== deptToUpdate.name ? selectedDepartmentId : deptToUpdate.id;

  const drData = {
    firstname: e.target.firstname.value,
    lastname: e.target.lastname.value,
    image: e.target.image.value,
    department:updatedDepartmentId,
    position: e.target.position.value,
  };
  console.log(drData)
console.log(selectedDepartmentId)
    axios
      .put(`${URL.updateDoctor}/${id}`, drData)
      .then((response) => {
        console.log("successfully updated", response.data);
        setCreateDoctor(false);
        setDrView(true);
        setUpdateDr(false)
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  return (
    <div>
      {create ? (
        <div>
          <h1>Create Doctor</h1>
          <form onSubmit={createDr}>
            <input type="text" name="firstname" />
            <input type="text" name="lastname" />
            <input type="text" name="image" />
            <select name="department"  onChange={(e) => handleDepartmentChange(e)}>
              {dept.map((department) => {
                return (
                  <option
                    data-department-id={department._id}
                    value={department.name}
                    key={department._id}
                  >
                    {department.name}
                  </option>
                );
              })}
            </select>
            <select name="position">
              <option>Chief</option>
              <option>Attending</option>
              <option>General</option>
            </select>

            <button type="submit">Create</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Update Doctor</h1>
          <form onSubmit={updateDr}>
            <input type="text" name="firstname" defaultValue={drToUpdate.firstname}/>
            <input type="text" name="lastname" defaultValue={drToUpdate.lastname}/>
            <input type="text" name="image" defaultValue={drToUpdate.image}/>
            <select name="department"  onChange={(e) => handleDepartmentChange(e)}>
            <option value={deptToUpdate.id} disabled selected> {deptToUpdate.name}</option>

              {dept.map((department) => {
                return (
                  <option
                    data-department-id={department._id}
                    value={department._id}
                    key={department._id}
                  >
                    {department.name}
                  </option>
                );
              })}
            </select>
            <select name="position">
            <option value={drToUpdate.position} disabled selected> {drToUpdate.position}</option>
              <option>Chief</option>
              <option>Attending</option>
              <option>General</option>
            </select>

            <button type="submit">Update the Docto Info</button>
          </form>
        </div>
      )}{" "}
    </div>
  );
}

export default CreateDoctor;
