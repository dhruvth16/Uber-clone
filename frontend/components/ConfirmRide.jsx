import PropTypes from "prop-types";

function ConfirmRide(props) {
  return (
    <div
      ref={props.confirmRideRef}
      className="absolute bottom-0 hidden w-full bg-white"
    >
      <div className="w-full p-2 bg-white shadow-inner shadow-gray-200 flex flex-col gap-2 rounded-t-xl">
        <h4
          className="text-center w-full"
          onClick={() => props.setConfirmRide(false)}
        >
          <i className="ri-arrow-down-wide-line text-xl text-gray-300"></i>
        </h4>
        <div>
          <h3 className="font-semibold text-center">Confirm your Ride</h3>
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
        <div className="p-2">
          <button
            onClick={() => {
              props.setVehicleFound(true);
              props.setConfirmRide(false);
              props.createRideDetails(
                props.currLocation,
                props.destLocation,
                props.activeVehicleFound
              );
            }}
            className="w-full bg-green-600 text-white font-semibold rounded-lg p-1"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
ConfirmRide.propTypes = {
  confirmRideRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  setConfirmRide: PropTypes.func.isRequired,
  setVehicleFound: PropTypes.func.isRequired,
  currLocation: PropTypes.string.isRequired,
  destLocation: PropTypes.string.isRequired,
  fare: PropTypes.object.isRequired,
  activeVehicleFound: PropTypes.string.isRequired,
  createRideDetails: PropTypes.func.isRequired,
};

export default ConfirmRide;
