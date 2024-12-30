import Proptypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router";

function AcceptRide(props) {
  const [otp, setOtp] = useState("");

  return (
    <div
      ref={props.acceptRideRef}
      className="h-screen absolute p-2 bg-white shadow-inner shadow-gray-200 rounded-t-lg w-full"
    >
      <h3 className="p-2 font-semibold text-lg">
        Confirmation for the new ride!
      </h3>
      <div className=" h-14 w-14  bg-gray-100 flex items-center justify-center rounded-full">
        <img
          className="h-10 w-10 rounded-full"
          src="https://t4.ftcdn.net/jpg/06/78/09/75/360_F_678097580_mgsNEISedI7fngOwIipYtEU0T6SN8qKv.jpg"
          alt=""
        />
      </div>
      <div className="mt-3 flex items-center justify-between bg-gray-50 p-1 rounded-lg">
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

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-gray-100 border-[1px] border-yellow-300 p-2 my-3 rounded-lg text-gray-600 placeholder: text-sm"
          type="text"
          placeholder="Enter OTP"
        />
        <div className="flex items-center gap-2 mt-2">
          <div
            onClick={() => {
              props.setRidePopUp(true);
              props.setAcceptRide(false);
              props.setIgnoreRide(false);
            }}
            className="w-1/2 p-1 bg-black rounded-lg text-center  bottom-1"
          >
            <Link
              to="/captainRiding"
              className="font-semibold text-white text-sm"
            >
              Confirm
            </Link>
          </div>
          <div
            onClick={() => {
              props.setAcceptRide(false);
              props.setIgnoreRide(false);
            }}
            className="w-1/2 p-1 bg-red-600 rounded-lg text-center  bottom-1"
          >
            <button className="font-semibold text-white text-sm">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

AcceptRide.propTypes = {
  acceptRideRef: Proptypes.object.isRequired,
  setAcceptRide: Proptypes.func.isRequired,
  setIgnoreRide: Proptypes.func.isRequired,
  setRidePopUp: Proptypes.func.isRequired,
};

export default AcceptRide;
