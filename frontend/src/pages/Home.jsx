// USER DASHBOARD
import { useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SearchLocationPanel from "../../components/SearchLocationPanel";
import SelectRide from "../../components/SelectRide";
import ConfirmRide from "../../components/ConfirmRide";
import LookingForDriver from "../../components/LookingForDriver";
import RideDetails from "../../components/RideDetails";

function Home() {
  const [currLocation, setCurrLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");
  const [inputPanelOpen, setInputPanelOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [rideDetails, setRideDetails] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(currLocation, destLocation);
  };

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const arrowRef = useRef(null);
  const rideRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const rideDetailsRef = useRef(null);

  useGSAP(() => {
    if (inputPanelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        display: "block",
      });
      gsap.to(inputRef.current, {
        bottom: "70%",
      });
      gsap.to(arrowRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        display: "none",
      });
      gsap.to(inputRef.current, {
        bottom: "0%",
      });
      gsap.to(arrowRef.current, {
        opacity: 0,
      });
    }
  }, [inputPanelOpen]);

  useGSAP(() => {
    if (selectedRide) {
      gsap.to(rideRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(rideRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [selectedRide]);

  useGSAP(() => {
    if (confirmRide) {
      gsap.to(confirmRideRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [confirmRide]);

  useGSAP(() => {
    if (rideDetails) {
      gsap.to(rideDetailsRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(rideDetailsRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [rideDetails]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        display: "block",
        bottom: "0%",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        display: "none",
        bottom: "-100%",
      });
    }
  }, [vehicleFound]);

  return (
    <>
      <div className="h-screen bg-red-200 w-full">
        <h1 className="absolute left-4 top-3 font-semibold text-2xl">Uber</h1>

        <img
          className="h-screen w-full object-cover"
          src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/7be2be6f43f64c27946d1068a602ece1.gif"
          alt=""
        />
        {/* onclick make the form top-0 and the div height-0 */}
        <form
          ref={inputRef}
          onSubmit={(e) => submitHandler(e)}
          className="absolute bottom-0 w-full p-3 h-[30%] bg-white flex flex-col gap-2 rounded-t-xl"
        >
          <div className="h-12 w-[3px] left-7 top-[80px] bg-black absolute"></div>

          <div className="flex">
            <div>
              <i
                ref={arrowRef}
                onClick={() => setInputPanelOpen(false)}
                className="ri-arrow-down-wide-line text-xl absolute right-6 top-2 opacity-0"
              ></i>
            </div>
            <div>
              <h3 className="font-semibold">Find a Trip</h3>
            </div>
          </div>
          <div>
            <div className="h-2 w-2 absolute left-[31px] top-[77px] bg-black rounded-full"></div>
            <input
              onClick={() => setInputPanelOpen(true)}
              value={currLocation}
              onChange={(e) => setCurrLocation(e.target.value)}
              className="bg-gray-200 px-8 py-2 rounded-lg  placeholder:text-sm placeholder:text-slate-500"
              type="text"
              placeholder="Enter your pick-up location"
            />
          </div>
          <div>
            <div className="h-2 w-2 absolute left-[31px] top-[138px] border-2 border-gray-500"></div>
            <input
              onClick={() => setInputPanelOpen(true)}
              value={destLocation}
              onChange={(e) => setDestLocation(e.target.value)}
              className="bg-gray-200 px-8 py-2 rounded-lg placeholder:text-sm placeholder:text-slate-500"
              type="text"
              placeholder="Enter your destination"
            />
          </div>
        </form>
        <div
          ref={panelRef}
          className="h-[0%] w-full bg-white absolute bottom-0 hidden"
        >
          <SearchLocationPanel
            setSelectedRide={setSelectedRide}
            setInputPanelOpen={setInputPanelOpen}
          />
        </div>
        <SelectRide
          rideRef={rideRef}
          setSelectedRide={setSelectedRide}
          setConfirmRide={setConfirmRide}
          confirmRideRef={confirmRideRef}
        />
        <ConfirmRide
          confirmRideRef={confirmRideRef}
          setConfirmRide={setConfirmRide}
          setVehicleFound={setVehicleFound}
        />
        <LookingForDriver
          vehicleFoundRef={vehicleFoundRef}
          setVehicleFound={setVehicleFound}
        />
        <RideDetails
          rideDetailsRef={rideDetails}
          setRideDetails={setRideDetails}
        />
      </div>
    </>
  );
}

export default Home;
