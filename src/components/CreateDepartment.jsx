import axios from 'axios'
import URL from '../links/links.json'
import { useState,useEffect } from 'react'

function CreateDepartment({create,id,setCreateDept,setDeptView}) {
    console.log(id,create)
    const [deptToUpdate,setDeptToUpdate]=useState({})
    useEffect(() => {
        axios.get(`${URL.departments}/${id}`).then((foundDepartments) => {
            console.log(foundDepartments.data)
            setDeptToUpdate(foundDepartments.data)
        });
      }, []);

  function createDept(e) {
    e.preventDefault();
    const deptData = {
      name: e.target.name.value,
      image: e.target.image.value,
      description: e.target.description.value,
    };
axios.post(URL.addDepartment,deptData)
.then(response=>{
    console.log(response.data);
    setCreateDept(false)
    setDeptView(true)
})
.catch(error=>{
    console.log(error);
})
    console.log("hello", deptData);
    
  }
  function updateDept(e){
    e.preventDefault();
    const updateDept = {
        name: e.target.name.value,
        image: e.target.image.value,
        description: e.target.description.value,
      };
    axios.put(`${URL.updateDept}/${id}`,updateDept)
    .then(response=>{
        console.log('successfully updated',response.data)
        setCreateDept(false)
        setDeptView(true)
    })
    .catch(error=>{
        console.log('error',error)
    })
   

  }

  return (
    <div>

    {create ? (
    <div>
      <h1>Create Department</h1>
      <form onSubmit={createDept}>
        <input type="text" name="name" />

        <input type="text" name="image" />

        <label>Description:</label>
        <textarea name="description" />

        <button type="submit">Create</button>
      </form>
    </div>): (<div>
      <h1>Update Department</h1>
      <form onSubmit={updateDept}>
        <input type="text" name="name" defaultValue={deptToUpdate.name}/>

        <input type="text" name="image" defaultValue={deptToUpdate.image}/>

        <label>Description:</label>
        <textarea name="description" defaultValue={deptToUpdate.description}/>

        <button type="submit">Update</button>
      </form>
    </div>)}
    </div>
  );
}

export default CreateDepartment;
