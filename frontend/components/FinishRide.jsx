import PropTypes from "prop-types";

function FinishRide(props) {
  console.log(props.ride);

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
          <p className="font-medium text-sm capitalize">
            {props.ride?.user.fullname.firstname + " "}
            {props.ride?.user.fullname.lastname}
          </p>
          <p className="text-sm font-semibold">
            {props.ride?.captain.vehicle.plate}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">₹{props.ride?.fare}</p>
        </div>
      </div>
      <div className="border-[1px] mt-3 border-yellow-300 p-2 rounded-lg relative">
        <h3 className="text-xs text-gray-600">Pick-up</h3>
        <p className="text-sm font-medium mt-2">{props.ride?.pickupAddress}</p>
      </div>
      <div className="border-[1px] mt-3 border-yellow-300 p-2 rounded-lg relative">
        <h3 className="text-xs text-gray-600">Drop-off</h3>
        <p className="text-sm font-medium mt-2">
          {props.ride?.destinationAddress}
        </p>
      </div>
      <div>
        <span className="text-red-600 font-bold text-[14px]">
          !! Click the finish button, only if the ride is completed.
        </span>
      </div>
      <div className="w-full mt-1 bg-green-500 rounded-lg text-center p-2">
        <button
          onClick={props.finishRide}
          className="w-full font-bold text-white text-md"
        >
          Finish Ride
        </button>
      </div>
    </>
  );
}

FinishRide.propTypes = {
  setRideComplete: PropTypes.func,
  ride: PropTypes.object,
  finishRide: PropTypes.func,
};

export default FinishRide;
