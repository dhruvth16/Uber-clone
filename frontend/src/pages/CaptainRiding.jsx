import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link } from "react-router";
import FinishRide from "../../components/FinishRide";
import { useNavigate } from "react-router";
import axios from "axios";
import { useLocation } from "react-router";
import LiveTracking from "./LiveTracking";

const CaptainRiding = () => {
  const [rideComplete, setRideComplete] = useState(false);
  const rideCompleteRef = useRef(null);
  const location = useLocation();
  const ride = location.state.riding || {};
  console.log("Ride: ", ride);
  const navigate = useNavigate();

  useGSAP(() => {
    if (rideComplete) {
      gsap.to(rideCompleteRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(rideCompleteRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [rideComplete]);

  const finishRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/finish-ride`,
        {
          rideId: ride.ride._id,
          captain: ride.ride.captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data);
      if (response.status === 200) {
        navigate("/captainDashboard");
      }
    } catch (error) {
      console.error("Error in finishRide:", error);
    }
  };

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
        <div className="h-screen w-full">
          <LiveTracking />
        </div>
        <div className="min-h-[25%] absolute bottom-0 p-2 bg-yellow-300 shadow-inner shadow-gray-200 rounded-t-lg w-full">
          <h3 className="text-center">
            <i
              onClick={() => setRideComplete(true)}
              className="ri-arrow-up-wide-line text-xl"
            ></i>
          </h3>
          <h3 className="font-semibold text-lg text-center">
            5 KM away from the destination!
          </h3>
        </div>
      </div>
      <div
        ref={rideCompleteRef}
        className="min-h-1/2 absolute bg-white w-[100%] p-2 rounded-t-lg shadow-inner shadow-gray-200"
      >
        <FinishRide
          finishRide={finishRide}
          ride={ride.ride}
          setRideComplete={setRideComplete}
        />
      </div>
    </>
  );
};

export default CaptainRiding;
