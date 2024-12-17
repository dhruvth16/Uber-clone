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
        <div className="p-2">
          <button
            onClick={() => {
              props.setVehicleFound(true);
              props.setConfirmRide(false);
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
};

export default ConfirmRide;
