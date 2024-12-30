import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function CaptainLogout() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout-captain`, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/captainLogin");
        }
      });
  }, [token, navigate]);

  return <div>CaptainLogout</div>;
}

export default CaptainLogout;
