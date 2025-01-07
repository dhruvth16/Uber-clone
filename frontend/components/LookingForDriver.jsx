import gsap from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function LookingForDriver(props) {
  const loaderRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      loaderRef.current,
      { x: "-100%" },
      {
        x: "100%",
        duration: 2,
        repeat: -1,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div
      ref={props.vehicleFoundRef}
      className="absolute bottom-0 hidden w-full bg-white"
    >
      <div className="w-full p-2 bg-white shadow-inner shadow-gray-200 flex flex-col gap-2 rounded-t-xl">
        <h4
          onClick={() => props.setVehicleFound(false)}
          className="text-center w-full"
        >
          <i className="ri-arrow-down-wide-line text-xl text-gray-300"></i>
        </h4>
        <div className="relative w-full h-[2px] bg-blue-300 overflow-hidden">
          {/* Loader Bar */}
          <div
            ref={loaderRef}
            className="absolute h-[2px] bg-blue-600 w-[50%]"
          ></div>
        </div>
        <div>
          <h3 className="font-semibold text-center">Looking for a Driver</h3>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          {props.activeVehicleFound === "car" ? (
            <img
              className=" h-24"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt=""
            />
          ) : props.activeVehicleFound === "auto" ? (
            <img
              className=" h-24"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
              alt=""
            />
          ) : (
            <img
              className=" h-24"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
              alt=""
            />
          )}
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2 p-2 border-b-[1px]">
            <div>
              <i className="ri-map-pin-fill"></i>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Pick-up Location</h3>
              <p className="text-xs text-gray-600">{props.currLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 border-b-[1px]">
            <div>
              <i className="ri-focus-3-fill"></i>{" "}
            </div>
            <div>
              <h3 className="font-semibold text-sm">Destination Location</h3>
              <p className="text-xs text-gray-600">{props.destLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 ">
            <div>
              <i className="ri-currency-line"></i>{" "}
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                ₹
                {props.activeVehicleFound === "car"
                  ? props.fare.car
                  : props.activeVehicleFound === "auto"
                  ? props.fare.auto
                  : props.fare.bike}
              </h3>
              <p className="text-xs text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LookingForDriver.propTypes = {
  vehicleFoundRef: PropTypes.object,
  setVehicleFound: PropTypes.func.isRequired,
  currLocation: PropTypes.string.isRequired,
  destLocation: PropTypes.string.isRequired,
  activeVehicleFound: PropTypes.string.isRequired,
  fare: PropTypes.number.isRequired,
};

export default LookingForDriver;
