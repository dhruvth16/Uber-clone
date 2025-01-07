import { createContext } from "react";

export const CaptainDataContext = createContext({
  captain: {
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
  },
  setCaptain: () => {}, // Provide a default empty function
});
