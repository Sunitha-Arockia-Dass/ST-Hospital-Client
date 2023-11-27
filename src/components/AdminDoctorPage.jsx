import { useEffect , useState} from "react";
import axios from "axios";
import URL from "../links/links.json";
import CreateDoctor from './CreateDoctor'

function AdminDoctorPage({setDoctorView}){

    const [createDoctor, setCreateDoctor] = useState(null);
    const [updateDr, setUpdateDr] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [drView, setDrView] = useState(true);
    const [doctorId,setDoctorId]=useState()
  
    useEffect(() => {
        axios.get(URL.doctors).then((foundDoctors) => {
            // console.log(foundDoctors.data)
            setDoctors(foundDoctors.data);
        });
      }, [drView]);
      const updateDoctor = (id) => {
        setDrView(false);
        setUpdateDr(true);
        setDoctorId(id)
      };
    
      const deleteDoctor = (id) => {
        axios
          .delete(`${URL.deleteDoctor}/${id}`)
          .then((response) => {
            console.log("successfully deleted", response.data);
            setDoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor._id !== id)
          );
          })
          .catch((error) => {
            console.log("error", error);
          });
      };

    return(
        <div>
           <h1>Doctors List</h1> 
            <button onClick={()=>{setDoctorView(false)}} >Go Back</button>
            <button
        onClick={() => {
            setCreateDoctor(true), setDrView(false);
        }}
      >
        Add
      </button>
      {drView &&
        doctors?.map((doctor) => {
          return (
            <div key={doctors._id}>
              <fieldset>
                <legend>
                  <h4>{doctor.firstname} {doctor.lastname}</h4>
                </legend>
                <h6>Position:{doctor.position} Doctor of {doctor.department[0].name}</h6>
                {/* <img src={doctors.image} alt="Department icon" /> */}
                <button
                  onClick={() => {
                    updateDoctor(doctor._id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteDoctor(doctor._id);
                  }}
                >
                  Delete
                </button>
              </fieldset>
            </div>
          );
        })}
        {createDoctor && <CreateDoctor create={true} setDrView={setDrView} setCreateDoctor={setCreateDoctor} id={""} setUpdateDr={setUpdateDr}/>}
      {updateDr  && <CreateDoctor create={false} setDrView={setDrView} setCreateDoctor={setCreateDoctor} id={doctorId} setUpdateDr={setUpdateDr}/>}

        </div>
    )
}

export default AdminDoctorPage