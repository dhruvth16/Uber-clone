import { Link } from "react-router";
import PropTypes from "prop-types";

function FinishRide(props) {
  return (
    <>
      <h3 className="text-center">
        <i
          onClick={() => props.setRideComplete(false)}
          className="ri-arrow-down-wide-line text-xl"
        ></i>
      </h3>
      <div className=" flex items-center justify-between bg-gray-50 p-2 rounded-lg">
        <div>
          <p className="font-medium text-sm">Carlsen</p>
          <p className="text-sm font-semibold">DL 1A 0001</p>
        </div>
        <div>
          <p className="text-sm font-semibold">$10</p>
        </div>
      </div>
      <div className="border-[1px] mt-3 border-yellow-300 p-2 rounded-lg relative">
        <h3 className="text-xs text-gray-600">Pick-up</h3>
        <p className="text-sm font-medium mt-2">480/B, Near Ashok Hotel</p>
      </div>
      <div className="border-[1px] mt-3 border-yellow-300 p-2 rounded-lg relative">
        <h3 className="text-xs text-gray-600">Drop-off</h3>
        <p className="text-sm font-medium mt-2">Nataliya Apartment</p>
      </div>
      <div>
        <span className="text-red-600 font-bold text-[14px]">
          !! Click the finish button, only if the ride is completed.
        </span>
      </div>
      <div className="w-full mt-1 bg-green-500 rounded-lg text-center p-2">
        <Link
          to="/captainDashboard"
          className="w-full font-bold text-white text-md"
        >
          Finish Ride
        </Link>
      </div>
    </>
  );
}

FinishRide.propTypes = {
  setRideComplete: PropTypes.func,
};

export default FinishRide;
