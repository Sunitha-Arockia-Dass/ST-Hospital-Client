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
    <div className='manage-dpt'>

    {create ? (
    <div>
      <h5>Create Department</h5>
      <form onSubmit={createDept}>
        <input type="text" name="name" placeholder="department's name"/>

        <input type="text" name="image" placeholder="department's image"/>

        <textarea name="description" placeholder="department's description"/>

        <button className="form" type="submit">Create</button>
      </form>
    </div>): (<div>
      <h5>Update Department</h5>
      <form onSubmit={updateDept}>
        <input type="text" name="name" placeholder="department's name" defaultValue={deptToUpdate.name}/>

        <input type="text" name="image" placeholder="department's image" defaultValue={deptToUpdate.image}/>

        <label>Description:</label>
        <textarea name="description" placeholder="department's description" defaultValue={deptToUpdate.description}/>

        <button className="form" type="submit">Update</button>
      </form>
    </div>)}
    </div>
  );
}

export default CreateDepartment;
