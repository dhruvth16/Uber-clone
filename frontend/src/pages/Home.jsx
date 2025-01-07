// USER DASHBOARD
import { useContext, useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SearchLocationPanel from "../../components/SearchLocationPanel";
import SelectRide from "../../components/SelectRide";
import ConfirmRide from "../../components/ConfirmRide";
import LookingForDriver from "../../components/LookingForDriver";
import RideDetails from "../../components/RideDetails";
import { SocketIOContext } from "../context/SocketIOContext";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { useNavigate } from "react-router";
import LiveTracking from "./LiveTracking";

function Home() {
  const [currLocation, setCurrLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");
  const [inputPanelOpen, setInputPanelOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [rideDetails, setRideDetails] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [fare, setFare] = useState(0);
  const [activeInput, setActiveInput] = useState("pickup");
  const [activeVehicleFound, setActiveVehicleFound] = useState("car");
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();
  const { sendMessage, newSocket } = useContext(SocketIOContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    newSocket.onAny((event, ...args) => {
      console.log(`Event received: ${event}`, args);
    });

    return () => {
      newSocket.offAny();
    };
  }, [newSocket]);

  useEffect(() => {
    // console.log("User: ", user);
    sendMessage("join", {
      userType: "user",
      userId: user._id,
    });
  }, [sendMessage, user._id]);

  useEffect(() => {
    newSocket.on("ride-accepted", (data) => {
      setRideDetails(true);
      setVehicleFound(false);
      setRide(data);
    });

    newSocket.on("ride-started", (data) => {
      setRideDetails(false);
      navigate("/riding", { state: { data } });
    });

    newSocket.on("ride-cancelled", () => {
      setRideDetails(false);
    });

    return () => {
      newSocket.off("ride-accepted");
      newSocket.off("ride-finished");
      newSocket.off("ride-started");
      newSocket.off("ride-cancelled");
    };
  }, [newSocket, navigate]);

  const fetchSuggestions = async (query, type) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: query,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Response: ", response.data.suggestions);
      setSuggestions(response.data.suggestions || []);
      setActiveInput(type);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleLocationSelect = (location) => {
    if (activeInput === "pickup") {
      setCurrLocation(location);
    } else {
      setDestLocation(location);
    }
    setSuggestions([]);
  };

  const fetchFare = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickupAddress: currLocation,
            destinationAddress: destLocation,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Fare: ", response.data);
      setFare(response.data.fare);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  const createRideDetails = async () => {
    console.log(currLocation, destLocation, activeVehicleFound);
    console.log(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickupAddress: currLocation,
          destinationAddress: destLocation,
          vehicleType: activeVehicleFound,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Ride Details: ", response.data);
    } catch (error) {
      console.error("Error creating ride details:", error);
    }
  };

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
        <h1 className="absolute z-10 left-4 top-3 font-semibold text-2xl">
          Uber
        </h1>

        <LiveTracking />
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
              onClick={() => {
                setInputPanelOpen(true);
                setActiveInput("pickup");
              }}
              value={currLocation}
              onChange={(e) => {
                setCurrLocation(e.target.value);
                fetchSuggestions(e.target.value, "pickup");
              }}
              className="bg-gray-200 px-8 py-2 rounded-lg  placeholder:text-sm placeholder:text-slate-500"
              type="text"
              placeholder="Enter your pick-up location"
              required
            />
          </div>
          <div>
            <div className="h-2 w-2 absolute left-[31px] top-[138px] border-2 border-gray-500"></div>
            <input
              onClick={() => {
                setInputPanelOpen(true);
                setActiveInput("destination");
              }}
              value={destLocation}
              onChange={(e) => {
                setDestLocation(e.target.value);
                fetchSuggestions(e.target.value, "destination");
              }}
              className="bg-gray-200 px-8 py-2 rounded-lg placeholder:text-sm placeholder:text-slate-500"
              type="text"
              placeholder="Enter your destination"
              required
            />
          </div>
        </form>

        <div
          ref={panelRef}
          className="h-[0%] w-full bg-white absolute bottom-0 hidden"
        >
          <SearchLocationPanel
            suggestions={suggestions}
            onSelectLocation={handleLocationSelect}
            setSelectedRide={setSelectedRide}
            setInputPanelOpen={setInputPanelOpen}
            fetchFare={fetchFare}
            currLocation={currLocation}
            destLocation={destLocation}
          />
        </div>

        <SelectRide
          rideRef={rideRef}
          setSelectedRide={setSelectedRide}
          setConfirmRide={setConfirmRide}
          confirmRideRef={confirmRideRef}
          currLocation={currLocation}
          destLocation={destLocation}
          fare={fare}
          setActiveVehicleFound={setActiveVehicleFound}
        />
        <ConfirmRide
          confirmRideRef={confirmRideRef}
          setConfirmRide={setConfirmRide}
          setVehicleFound={setVehicleFound}
          currLocation={currLocation}
          destLocation={destLocation}
          fare={fare}
          activeVehicleFound={activeVehicleFound}
          createRideDetails={createRideDetails}
        />
        <LookingForDriver
          vehicleFoundRef={vehicleFoundRef}
          setVehicleFound={setVehicleFound}
          currLocation={currLocation}
          destLocation={destLocation}
          fare={fare}
          activeVehicleFound={activeVehicleFound}
        />
        <RideDetails
          rideDetailsRef={rideDetailsRef}
          setRideDetails={setRideDetails}
          ride={ride}
        />
      </div>
    </>
  );
}

export default Home;
