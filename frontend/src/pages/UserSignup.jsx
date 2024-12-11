import { NavLink } from "react-router";
import { RiMotorbikeFill } from "react-icons/ri";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-4">
      <div className="w-full max-w-sm bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form className="space-y-4">
          {/* First Name */}
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

          {/* Last Name (Optional) */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Socket ID */}
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

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <NavLink to="/userLogin" className="text-gray-200 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
