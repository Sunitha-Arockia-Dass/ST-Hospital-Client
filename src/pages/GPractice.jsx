import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import URL from "../links/links.json";

function GPractice() {
  const [gps, setGPs] = useState();
  const [delayLayout, setDelayLayout] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    axios
      .get(URL.gPractice)
      .then((response) => {
        setGPs(response.data);
        setDelayLayout(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }, []);

  // GPractice Animation //////////////////////////////////////////
  useLayoutEffect(() => {
    if (delayLayout) {
      const tlGeneralPractitien = gsap.timeline({
        defaults: { duration: 0.5, ease: "power1.out" },
      });
      tlGeneralPractitien
        .fromTo(".dpt-page h3", { x: -20 }, { x: 0, delay: 0.5 })
        .fromTo(
          ".one-gp",
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.05 },
          "<"
        )
        .fromTo(
          ".fieldset legend",
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.025, ease: "bounce" },
          0.5
        );
    }
  }, [delayLayout]);

  return (
    <div className="dpt-page full">
      <div className="container">
        <h3>
          General Practitioners
          <span>
            <h4>Afilliated to this hospital</h4>
          </span>
        </h3>
      </div>

      <div className="all-dpt">
        {gps?.map((gp) => {
          return (
            <div key={gp._id} className="one-gp">
              <fieldset className="fieldset gradient-bg">
                <legend>
                  <h4>{gp.name}</h4>
                </legend>
                <p>{gp.email}</p>
                <p>{gp.phoneNumber}</p>
                <p>
                  {gp.address.street} {gp.address.houseNumber}{" "}
                </p>
                <p>
                  {gp.address.postalCode} {gp.address.city}{" "}
                </p>
                <p>{gp.address.country}</p>
              </fieldset>
            </div>
          );
        })}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default GPractice;
