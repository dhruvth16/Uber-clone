import { Link } from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { SocketIOContext } from "../context/SocketIOContext";
import { useContext, useEffect } from "react";
import LiveTracking from "./LiveTracking";

const Riding = () => {
  const location = useLocation();
  const ride = location.state.data || {};
  const { newSocket } = useContext(SocketIOContext);

  const navigate = useNavigate();

  console.log("Reaches finished ride");
  useEffect(() => {
    const handleRideFinished = () => {
      console.log("Ride Finished event received");
      // alert("Your ride has been completed!");
      navigate("/home");
    };

    // Register the listener
    newSocket.on("ride-finished", handleRideFinished);

    // Cleanup the listener on component unmount
    return () => {
      newSocket.off("ride-finished", handleRideFinished);
    };
  }, [newSocket, navigate]);

  return (
    <div className=" max-h-screen">
      <div>
        <LiveTracking />
      </div>
      <Link
        to="/home"
        className="z-10 absolute top-1 right-1 h-7 w-7 rounded-full bg-white flex items-center justify-center "
      >
        <i className="ri-home-3-line text-xl"></i>
      </Link>
      <div className="z-20 bg-white w-full absolute bottom-0">
        <div className="z-50 p-2 border-b-[1px]">
          <p className="font-semibold text-xl">On the way</p>
        </div>
        <div className="flex items-center justify-between gap-2 p-2 border-b-[1px] mb-3">
          <div className="flex items-center">
            <div className="flex z-10 items-center justify-centerh-14 w-14 rounded-full">
              <img
                className=" h-10 object-cover rounded-full"
                src="https://th.bing.com/th/id/OIG1.wQ7nqzXG6LLji1s3MrOP"
                alt=""
              />
            </div>
            <div className="flex absolute left-8 items-center justify-center h-14 w-14 rounded-full">
              <img
                className=" h-14 object-cover rounded-full"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
            </div>
          </div>
          <div className="p-2 text-right">
            <h3 className="text-sm text-gray-600">
              {ride?.captain.fullname.firstname + " "}
              {ride?.captain.fullname.lastname}
            </h3>
            <h3 className="font-semibold">{ride?.captain.vehicle.plate}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 mb-[70px]">
          <div>
            <i className="ri-focus-3-fill"></i>{" "}
          </div>
          <div>
            <h3 className="font-semibold text-sm">Destination Location</h3>
            <p className="text-xs text-gray-600">{ride?.destinationAddress}</p>
          </div>
        </div>
        <div className="p-2 absolute w-full bottom-2">
          <button className="w-full bg-black text-white font-semibold rounded-lg p-1">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
