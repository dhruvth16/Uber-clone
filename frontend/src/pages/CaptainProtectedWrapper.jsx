import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { CaptainDataContext } from "../context/CaptainDataContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function CaptainProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (!token) {
        navigate("/captainLogin");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/captain-profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setCaptain(response.data.captain);
          // console.log("Captain context after update:", response.data.captain);
          setisLoading(false);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/captainLogin");
      }
    };

    fetchCaptainProfile();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}
CaptainProtectedWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaptainProtectedWrapper;
