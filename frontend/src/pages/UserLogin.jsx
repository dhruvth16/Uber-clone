import { RiMotorbikeFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }
    const newUserData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login-user`,
        newUserData
      );
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full h-[90%] relative max-w-sm bg-white text-black rounded-lg shadow-lg px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 bg-gray-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              placeholder="email@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full mt-1 px-4 py-2 bg-gray-100 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Login
              <RiMotorbikeFill className="inline-block ml-2" />
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don&apos;t have an account?{" "}
          <NavLink to="/userSignup" className="text-gray-800 hover:underline">
            Sign up
          </NavLink>
        </p>
        <div className="absolute bottom-1">
          <img
            className="h-8 "
            alt=""
            src="data:image/jpeg;base64,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UAALA172eHuVLYUuJSEDAbkqBGIXA8V+VM6Ag9xJ9qh/g/RjRbPGPCbukanX9Hn8DSAlAcajSityEticZjQ0H98js6xHWCcNVSlKk7utrzWGm/0TZ9l+6I+LHPd4B6i9p8ryPt6F7BP3t/T72K2dFF1HvTDhgEJogR+FYZBuCv2lVlZdCi1Q8Pt8Or1/RmSsyVmSgYScXRYKJFbRiomBjgcDZkWwHw1zrGtrzWGlJIassvbjf7O2iNlxz3+nAnAoHeUyRlzjd2273yib2oHX9IdlDytwsPuUkonhJFAbC4o/KU2kUI5MeGWt2DzyOW41rah4AjjWVu9ZW71lbvWVu9ZW70GeFiGoylvQ+RvdVfmQgFxrK3esrd6yt3rK3esrd6yt3qcJixLDdqSqc+Jh+ayt3q1GYpctRIsdUtMrd6GD9QgF3X+oSGLZ44uDSEz3gO2Q4Vo999n65/xxMI7bgMOdK9WAQjtIhZsLKcN/8g1NiWD4DfU7pbi3luxuqcDNRia0Lefi9P5K/wCNThpdPz3edaZUtwnS2n41uEaQVgtaYJa/3TUgEPC12rHjcX8ze/yx0A4FR+ZnIp+z3S10jD/u+//aAAwDAQACAAMAAAAQ8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888w8888888888888888888888888888888888888888888pOuOOR8888888888888888888888888888888888888885+++++u78888888888888888888888888888888888888se+++++++8888398o/wDPestnfLevvtfFstt/PPPPPPPPPPOfvujTdvvh/PPFvfKPvPU/IX/PU/PPPAvPNtfPPPPPPPPPPMcZfPFvvk/PPHvfKPvPbvum/PbsrfPBktvtPPPPPPPPPPLfvrscVvvn/PPB+9KZvPR/LPvPV/PNPAnOWvPPPPPPPPPPKNvvvvvvulPPPLL3rnPPfjipfObjjtfBvLN1PPPPPPPPPPPDdvvvvuj/ADzzzzzzzzzz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"
          />
        </div>
        <div className="absolute bottom-2 right-6">
          <Link to="/captainSignup" className="text-blue-500 underline text-xs">
            Register as a Captain?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
