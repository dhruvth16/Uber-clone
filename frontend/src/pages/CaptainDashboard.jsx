import { Link } from "react-router";
import RidePopUp from "../../components/RidePopUp";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AcceptRide from "../../components/AcceptRide";

function CaptainDashboard() {
  const [acceptRide, setAcceptRide] = useState(false);
  const [ignoreRide, setIgnoreRide] = useState(true); // later make it false initially
  const [ridePopUp, setRidePopUp] = useState(false);
  const acceptRideRef = useRef(null);
  const ignoreRideRef = useRef(null);
  const ridePopUpRef = useRef(null);

  useGSAP(() => {
    if (acceptRide) {
      gsap.to(acceptRideRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(acceptRideRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [acceptRide]);

  useGSAP(() => {
    if (ignoreRide) {
      gsap.to(ignoreRideRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(ignoreRideRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [ignoreRide]);

  useGSAP(() => {
    if (ridePopUp) {
      gsap.to(ridePopUpRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(ridePopUpRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [ridePopUp]);

  return (
    <>
      <div className="h-screen w-full">
        <div className="h-12 absolute p-2 flex items-center gap-4 justify-between w-full">
          <h3 className="font-semibold text-xl">Uber</h3>
          <Link
            to="/captainLogin"
            className="flex items-center justify-center bg-white h-8 w-8 rounded-full"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </Link>
        </div>
        <div className="h-1/2 w-full">
          <img
            className="h-full w-full object-cover"
            src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/7be2be6f43f64c27946d1068a602ece1.gif"
            alt=""
          />
        </div>
        <div className="h-1/2 absolute p-2 bg-white shadow-inner shadow-gray-200 rounded-t-lg w-full">
          <div className="absolute h-14 w-14 top-[-35px] bg-gray-100 flex items-center justify-center rounded-full">
            <img
              className="h-10 w-10 rounded-full"
              src="https://t4.ftcdn.net/jpg/06/78/09/75/360_F_678097580_mgsNEISedI7fngOwIipYtEU0T6SN8qKv.jpg"
              alt=""
            />
          </div>
          <p className="px-1 font-semibold text-sm rounded-xl mt-8 mb-2 w-1/2 bg-gray-100">
            Profile
          </p>
          <div className="flex items-center justify-between bg-gray-50 p-1 rounded-lg">
            <div>
              <p className="font-medium text-sm">Carlsen</p>
              <p className="text-sm font-semibold">DL 1A 0001</p>
            </div>
            <div>
              <p className="text-sm font-semibold">
                $50<span> Earned</span>
              </p>
            </div>
          </div>
          <div className=" mt-3 flex items-center justify-between bg-yellow-300 p-3 rounded-lg ">
            <div className="flex flex-col items-center">
              <h3>
                <i className="ri-timer-2-line text-lg"></i>
              </h3>
              <p className="text-sm font-medium">2 Hours</p>
              <p className="text-xs text-gray-600">Hours Online</p>
            </div>
            <div className="flex flex-col items-center">
              <h3>
                <i className="ri-speed-up-line text-lg"></i>
              </h3>
              <p className="text-sm font-medium">10.3 KM</p>
              <p className="text-xs text-gray-600">Total Distance</p>
            </div>
            <div className="flex flex-col items-center">
              <h3>
                <i className="ri-booklet-line text-lg"></i>
              </h3>
              <p className="text-sm font-medium">10</p>
              <p className="text-xs text-gray-600">Total Jobs</p>
            </div>
          </div>
        </div>
        <RidePopUp
          setAcceptRide={setAcceptRide}
          setIgnoreRide={setIgnoreRide}
          ignoreRideRef={ignoreRideRef}
        />
        <AcceptRide
          acceptRideRef={acceptRideRef}
          setAcceptRide={setAcceptRide}
          setIgnoreRide={setIgnoreRide}
          setRidePopUp={setRidePopUp}
        />
      </div>
    </>
  );
}

export default CaptainDashboard;
