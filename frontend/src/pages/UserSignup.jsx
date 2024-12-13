import { NavLink } from "react-router";
import { RiMotorbikeFill } from "react-icons/ri";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserDataContext } from "../context/UserDataContext";

const SignUpPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    const newUserData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
    console.log(newUserData);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register-user`,
        newUserData
      );
      console.log(response);
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    } finally {
      resetForm();
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4 py-4">
      <div className="w-full max-w-sm bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="firstname"
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <InputField
            id="lastname"
            label="Last Name (Optional)"
            type="text"
            placeholder="Enter your last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 ${
              isLoading ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-700"
            } text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
          >
            {isLoading ? "Signing Up..." : "Sign Up as User"}
            <RiMotorbikeFill />
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center my-6">
          Already have an account?{" "}
          <NavLink to="/userLogin" className="text-gray-800 hover:underline">
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

import PropTypes from "prop-types";

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default SignUpPage;
