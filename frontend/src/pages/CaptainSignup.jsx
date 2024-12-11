import { NavLink } from "react-router";
import { RiMotorbikeFill } from "react-icons/ri";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-4">
      <div className="w-full max-w-lg bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form className="space-y-4">
          {/* Personal Details */}
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-400"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-400"
            >
              Last Name (Optional)
            </label>
            <input
              type="text"
              id="lastname"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="socketId"
              className="block text-sm font-medium text-gray-400"
            >
              Socket ID
            </label>
            <input
              type="text"
              id="socketId"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter your socket ID"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-400"
            >
              Status
            </label>
            <select
              id="status"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Vehicle Details */}
          <h2 className="text-lg font-bold text-gray-200 mt-6">Vehicle Details</h2>
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-400"
            >
              Vehicle Color
            </label>
            <input
              type="text"
              id="color"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter vehicle color"
              required
            />
          </div>

          <div>
            <label
              htmlFor="plate"
              className="block text-sm font-medium text-gray-400"
            >
              Vehicle Plate
            </label>
            <input
              type="text"
              id="plate"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter vehicle plate number"
              required
            />
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-gray-400"
            >
              Vehicle Capacity
            </label>
            <input
              type="number"
              id="capacity"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter vehicle capacity"
              required
            />
          </div>

          <div>
            <label
              htmlFor="vehicleType"
              className="block text-sm font-medium text-gray-400"
            >
              Vehicle Type
            </label>
            <input
              type="text"
              id="vehicleType"
              className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter vehicle type"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Sign Up
              <RiMotorbikeFill />
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <NavLink to="/captainLogin" className="text-gray-200 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
