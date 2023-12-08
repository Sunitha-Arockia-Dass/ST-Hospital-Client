import { useNavigate, useLocation, Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import IsPrivate from "./IsPrivate";
import gsap from "gsap";

const SingleDept = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const department = location.state?.department;
  // singletDpt Gsap Animation //////////////////////////////////////////
  useLayoutEffect(() => {
    const tlsingletDpt = gsap.timeline({
      defaults: { duration: 0.25, ease: "power1.out" },
    });
    tlsingletDpt
      .fromTo("#single-dep", { opacity: 0, x: -20 }, { opacity: 1, x: 0 })
      .fromTo("#single-dep h4", { opacity: 0, x: -20 }, { opacity: 1, x: 0 })
      .fromTo("#single-dep p", { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, "<")
      .fromTo(
        "#single-dep legend",
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.025, ease: "bounce" }
      )
      .fromTo(
        "#single-dep .single-img",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.025, ease: "bounce" }
      );
  });

  return (
    <div id="single-dep" className="dpt-page single-dpt" key={department._id}>
      <fieldset className="fieldset gradient-bg">
        <legend>
          <h3>{department?.name}</h3>
        </legend>
        <p>{department?.description}</p>

        <h4 className="doctors">Doctors:</h4>
        {department.doctors?.map((doctor) => {
          return (
            <Link
              key={doctor._id}
              to={`/doctor/${doctor._id}`}
              state={{ doctor: doctor, department: department }}
            >
              <p className="doctor">
                {doctor.position}: {doctor.firstname} {doctor.lastname}{" "}
              </p>
            </Link>
          );
        })}
        <div className="single-img">
          <img src={department?.image} alt="Department icon" />
        </div>
      </fieldset>

      <button
        className="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        ↩ Back
      </button>
    </div>
  );
};

export default SingleDept;
