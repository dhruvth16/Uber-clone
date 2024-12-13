import { createContext } from "react";

export const UserDataContext = createContext({
  user: {
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  },
  setUser: () => {}, // Provide a default empty function
});
