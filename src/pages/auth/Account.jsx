import PatientApptDetails from "../../components/PatientApptDetails";
import Doctor from "../../components/Doctor";
import AdminPage from "../admins/AdminPage";
import PatientGPracticeDetails from "../../components/PatientGPracticeDetails";
import PatientPersonalInfo from "../../components/PatientPersonalInfo";
import PatientRecords from "../../components/PatientRecords";
import { AuthContext } from "../../context/auth.context";
import { useContext, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { Link } from "react-router-dom";

function Account() {
  const { user } = useContext(AuthContext);

  // Account Gsap Animation //////////////////////////////////////////
  useLayoutEffect(() => {
    const tlAccount = gsap.timeline({
      defaults: { duration: 0.25, ease: "power1.out" },
    });
    tlAccount
      .fromTo(
        "#account .first-block",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1 }
      )
      .fromTo(
        "#account .second-block",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1 }
      )
      .fromTo(
        "#account fieldset",
        { rotateY: -90, transformOrigin: "left" },
        { rotateY: 0 },
        "<"
      )
      .fromTo(
        "#account button",
        { rotateY: -90, transformOrigin: "left" },
        { rotateY: 0 }
      )
      .fromTo("#account legend", { opacity: 0, y: -25 }, { opacity: 1, y: 0 });
  });

  return (
    <div id="account" className="dpt-page">
      {user.role === "patient" && (
        <>
          <div className="main-frame">
            <div className="first-block gradient-bg">
              <PatientPersonalInfo />
              <PatientGPracticeDetails />
            </div>

            <div className="second-block gradient-bg">
              <PatientApptDetails />
              <PatientRecords />
            </div>
            <p>
              Wanna keep track of weight and appointments of yourself and loved
              ones? Try this
            </p>
            <Link to="https://kind-pink-iguana-gown.cyclic.app/">
              H.E.A.L.T.H
            </Link>
          </div>
        </>
      )}
      <div className="">
        {user.role === "doctor" && <Doctor />}
        {user.role === "admin" && <AdminPage />}
      </div>
    </div>
  );
}

export default Account;
