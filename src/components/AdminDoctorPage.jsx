import { useEffect, useState } from "react";
import axios from "axios";
import URL from "../links/links.json";
import CreateDoctor from "./CreateDoctor";
import CreateCredentials from "./CreateCredentials";

function AdminDoctorPage({ setDoctorView, createCredentials, setSelectDrView }) {
  const [createDoctor, setCreateDoctor] = useState(null);
  const [updateDr, setUpdateDr] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [drView, setDrView] = useState(true);
  const [doctorId, setDoctorId] = useState();
  const [formView, setFormView] = useState(false);

  useEffect(() => {
    axios.get(URL.doctors).then((foundDoctors) => {
      setDoctors(foundDoctors.data);
    });
  }, [drView]);
  const updateDoctor = (id) => {
    setDrView(false);
    setUpdateDr(true);
    setDoctorId(id);
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
  function showForm(doctor) {
    console.log("div clicked");
    setFormView(true);
    setDrView(false);
    setDoctorView(false);
    setSelectedDoctor(doctor);
    createCredentials = false

  }
console.log('doctor',doctors[0])
  return (
    <div className="dpt-page">
      {createCredentials ? <h4 className="admin">Change doctor&apos;s credentials</h4> : <h4 className="admin">Manage doctor&apos;s datas</h4>}
      <div className="all-dpt">
      <div className="admin one-dpt">
        <button className="back admin" onClick={() => {
          setDoctorView(false);
          setFormView(false);
          setDrView(true);
          setSelectDrView(false);
        }}>↩ Back</button>
        
        <button className="back admin" onClick={() => { setCreateDoctor(true), setDrView(false); }}><b>Add +</b></button>
        </div>

        {drView &&
          doctors?.map((doctor) => {
            return createCredentials ? (
              <div className="admin one-dpt"
                key={doctor._id}
                onClick={() => {
                  showForm(doctor);
                }}
              >
                <fieldset className="fieldset">
                  <legend>
                    <h4>
                      {doctor.firstname} {doctor.lastname}
                    </h4>
                  </legend>
                  <h6>
                    Position: {doctor.position} Doctor of{" "}
                    {doctor.department.name}
                  </h6>
                  {/* <img src={doctor.image} alt="Doctor icon" /> */}
                </fieldset>
              </div>
            ) : (
              <div className="admin one-dpt" key={doctor._id}>
                <fieldset className="fieldset">
                  <legend>
                    <h4>
                      {doctor.firstname} {doctor.lastname}
                    </h4>
                  </legend>
                  <h6>{doctor.position} Doctor of </h6>
                  <h6>{doctor.department[0].name}</h6>
                  {/* <img src={doctor.image} alt="Doctor icon" /> */}
                </fieldset>
                <button className="back"
                  onClick={() => {
                    updateDoctor(doctor._id);
                  }}
                >
                  Update
                </button>
                <button className="back"
                  onClick={() => {
                    deleteDoctor(doctor._id);
                  }}
                >
                  Delete
                </button>
              </div>

            );
          })}

        {createDoctor && (
          <CreateDoctor
            create={true}
            setDrView={setDrView}
            setCreateDoctor={setCreateDoctor}
            id={""}
            setUpdateDr={setUpdateDr}
          />
        )}
        {updateDr && (
          <CreateDoctor
            create={false}
            setDrView={setDrView}
            setCreateDoctor={setCreateDoctor}
            id={doctorId}
            setUpdateDr={setUpdateDr}
          />
        )}
        {formView && (
          <CreateCredentials
            selectedDoctor={selectedDoctor}
            setDoctorView={setDoctorView}
            setFormView={setFormView}
            setSelectDrView={setSelectDrView}
            createCredentials={createCredentials}
          />
        )}
      </div>
    </div>

  );
}

export default AdminDoctorPage;
