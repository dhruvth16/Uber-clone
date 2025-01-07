import Proptypes from "prop-types";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AcceptRide(props) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const checkOtp = () => {
    if (otp.join("") !== props.rideConfirmed?.otp) {
      alert("Invalid OTP");
      return false;
    }

    if (otp.some((digit) => digit === "")) {
      alert("Please fill all OTP boxes");
      return false;
    }
    return true;
  };

  const handleOtp = () => {
    if (checkOtp()) {
      props.setRidePopUp(true);
      props.setAcceptRide(false);
      props.setIgnoreRide(false);
    }
  };

  const handleInputChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only allow a single digit

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      // Move focus to the next input
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);

      if (index > 0) {
        // Move focus to the previous input
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (checkOtp()) {
      const otpValue = otp.join("");
      // console.log(otpValue);
      console.log(props.rideConfirmed?._id);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
          {
            params: {
              rideId: props.rideConfirmed._id,
              otp: otpValue,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // console.log(response.data);
        if (response.status === 200) {
          props.setAcceptRide(false);
          props.setIgnoreRide(false);
          navigate("/captainRiding", { state: { riding: response.data } });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      ref={props.acceptRideRef}
      className="h-screen absolute p-2 bg-white shadow-inner shadow-gray-200 rounded-t-lg w-full"
    >
      <h3 className="p-2 font-semibold text-lg">
        Confirmation for the new ride!
      </h3>
      <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
        <p className="font-medium text-sm capitalize">
          {props.rideConfirmed?.user.fullname.firstname + " "}
          {props.rideConfirmed?.user.fullname.lastname}
        </p>
        <div>
          <p className="text-sm font-semibold">₹{props.rideConfirmed?.fare}</p>
        </div>
      </div>
      <div className="border-[1px] mt-3 border-yellow-300 p-2 rounded-lg relative">
        <h3 className="text-xs text-gray-600">Pick-up</h3>
        <p className="text-sm font-medium mt-2">
          {props.rideConfirmed?.pickupAddress}
        </p>
      </div>
      <div className="border-[1px] mt-3 border-yellow-300 p-2 rounded-lg relative">
        <h3 className="text-xs text-gray-600">Drop-off</h3>
        <p className="text-sm font-medium mt-2">
          {props.rideConfirmed?.destinationAddress}
        </p>
      </div>

      <form onSubmit={submitHandler}>
        <h3 className="mt-5 font-semibold text-md">Enter the OTP</h3>
        <div className="flex justify-center gap-3 mb-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              value={otp[index]}
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md bg-gray-100 focus:outline-none"
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div
            onClick={() => {
              handleOtp();
            }}
            className="w-1/2 p-1 bg-black rounded-lg text-center  bottom-1"
          >
            <button className="font-semibold text-white text-sm">
              Confirm
            </button>
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
  rideConfirmed: Proptypes.object,
};

export default AcceptRide;
