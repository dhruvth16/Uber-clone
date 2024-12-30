import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link } from "react-router";
import FinishRide from "../../components/FinishRide";

const CaptainRiding = () => {
  const [rideComplete, setRideComplete] = useState(false);
  const rideCompleteRef = useRef(null);

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
        <div className="h-5/6 w-full">
          <img
            className="h-full w-full object-cover"
            src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/7be2be6f43f64c27946d1068a602ece1.gif"
            alt=""
          />
        </div>
        <div className="min-h-[16.6%] absolute p-2 bg-yellow-300 shadow-inner shadow-gray-200 rounded-t-lg w-full">
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
        <FinishRide setRideComplete={setRideComplete} />
      </div>
    </>
  );
};

export default CaptainRiding;
