import { useEffect, useState } from "react";
import axios from "axios";
import URL from "../links/links.json";
import CreateDoctor from "./CreateDoctor";
import CreateCredentials from "./CreateCredentials";

function AdminDoctorPage({ setDoctorView, createCredentials }) {
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
    createCredentials=false

  }

  return (
    <div>
      {createCredentials ? <h1>Select A Doctor</h1> : <h1>Doctors List</h1>}
      <button
        onClick={() => {
          setDoctorView(false);
          setFormView(false);
          setDrView(true);


        }}
      >
        Go Back
      </button>
      <button
        onClick={() => {
          setCreateDoctor(true), setDrView(false);
        }}
      >
        Add
      </button>
      {drView &&
        doctors?.map((doctor) => {
          return createCredentials ? (
            <div
              key={doctor._id}
              onClick={() => {
                showForm(doctor);
              }}
            >
              <fieldset>
                <legend>
                  <h4>
                    {doctor.firstname} {doctor.lastname}
                  </h4>
                </legend>
                <h6>
                  Position: {doctor.position} Doctor of{" "}
                  {doctor.department[0].name}
                </h6>
                {/* <img src={doctor.image} alt="Doctor icon" /> */}
              </fieldset>
            </div>
          ) : (
            <div key={doctor._id}>
              <fieldset>
                <legend>
                  <h4>
                    {doctor.firstname} {doctor.lastname}
                  </h4>
                </legend>
                <h6>
                  Position: {doctor.position} Doctor of{" "}
                  {doctor.department[0].name}
                </h6>
                {/* <img src={doctor.image} alt="Doctor icon" /> */}
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
        />
      )}
    </div>
  );
}

export default AdminDoctorPage;
