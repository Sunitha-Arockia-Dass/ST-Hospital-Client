import axios from "axios";
import { useState, useEffect } from "react";
import URL from "../links/links.json";

function GPractice() {
  const [gps, setGPs] = useState();

  useEffect(() => {
    axios.get(URL.gPractice).then((response) => {
      console.log(response.data);
      setGPs(response.data);
    });
  }, []);
  return (
    <div>
      <h3>List of General Practices Afilliated to this hospital</h3>
      <div className="gp-details-container">
      {gps?.map((gp) => {
        return (
          <div key={gp._id} className="gp-details" >
            <h5>{gp.name}</h5>
            <h6>{gp.email}</h6>
            <h6>{gp.phoneNumber}</h6>
            <p>
              {gp.address.street} {gp.address.houseNumber}{" "}
            </p>
            <p>
              {gp.address.postalCode} {gp.address.city}{" "}
            </p>
            <p>{gp.address.country}</p>
            
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default GPractice;
