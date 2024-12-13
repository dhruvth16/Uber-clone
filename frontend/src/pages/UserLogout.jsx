import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function UserLogout() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout-user`, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/userLogin");
        }
      });
  }, [token, navigate]);

  return <div>UserLogout</div>;
}

export default UserLogout;
