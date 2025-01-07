import { useState } from "react";
import PropTypes from "prop-types";
import { CaptainDataContext } from "./CaptainDataContext";

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      vehicleType: "",
    },
  });

  // console.log("Captain context:", captain);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

CaptainContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaptainContext;
