import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";

function UserProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/userLogin");
      return null;
    }
    console.log("Token: ", token);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/user-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setisLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/userLogin");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}
UserProtectedWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProtectedWrapper;
