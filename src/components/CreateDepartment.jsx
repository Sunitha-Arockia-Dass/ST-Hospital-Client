function CreateDepartment() {
  function createDept(){

    
    console.log('hello')
  }
  
    return (
    <div>
      <h1>Create Department</h1>
      <form onSubmit={createDept}>
        <input type="text" name="name" />

        <input type="text" name="image" />

        <label>Description:</label>
        <textarea name="description" />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateDepartment;
