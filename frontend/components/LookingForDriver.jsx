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
          <img
            className=" h-24"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2 p-2 border-b-[1px]">
            <div>
              <i className="ri-map-pin-fill"></i>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Pick-up Location</h3>
              <p className="text-xs text-gray-600">123, Lorem Ipsum</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 border-b-[1px]">
            <div>
              <i className="ri-focus-3-fill"></i>{" "}
            </div>
            <div>
              <h3 className="font-semibold text-sm">Destination Location</h3>
              <p className="text-xs text-gray-600">456, Lorem Ipsum</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 ">
            <div>
              <i className="ri-currency-line"></i>{" "}
            </div>
            <div>
              <h3 className="font-semibold text-sm">$20</h3>
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
};

export default LookingForDriver;
