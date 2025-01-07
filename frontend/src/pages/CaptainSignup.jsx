import { useState, useContext } from "react";
import { CaptainDataContext } from "../context/CaptainDataContext";
import PropTypes from "prop-types";
import axios from "axios";
import { RiMotorbikeFill } from "react-icons/ri";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

const CaptainSignUpPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("bike");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const captainData = {
      fullname: {
        firstname,
        ...(lastname && { lastname }),
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    };
    console.log(captainData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register-captain`,
        captainData
      );
      // console.log("Response data:", response.data);
      setCaptain(response.data.captain);
      // console.log("Captain context after update:", response.data.captain);
      navigate("/captainDashboard");
      localStorage.setItem("token", response.data.token);
      alert("Registration successful!");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-4">
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-5">
          Sign Up as Captain
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="First Name"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter your first name"
            required
          />
          <InputField
            label="Last Name (Optional)"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter your last name"
          />
          <InputField
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            required
          />
          <InputField
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
            required
          />
          <InputField
            label="Vehicle Color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter vehicle color"
            required
          />
          <InputField
            label="Plate Number"
            id="plate"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="Enter plate number"
            required
          />
          <InputField
            label="Capacity"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Enter vehicle capacity"
            type="number"
            required
          />
          <div>
            <label
              htmlFor="vehicleType"
              className="block text-sm font-medium text-gray-600"
            >
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            >
              <option value="svt">Select vehicle type</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Auto">Auto</option>
            </select>
          </div>
          <button
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 ${
              loading ? "bg-gray-400" : "bg-slate-800 hover:bg-gray-700"
            } text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up as Captain"}
            {!loading && <RiMotorbikeFill />}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center my-6">
          Already have an account?{" "}
          <NavLink to="/captainLogin" className="text-gray-800 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full mt-1 px-4 py-2 bg-gray-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default CaptainSignUpPage;
