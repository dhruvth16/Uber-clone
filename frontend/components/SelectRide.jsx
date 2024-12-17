import "remixicon/fonts/remixicon.css";
import PropTypes from "prop-types";

function SelectRide(props) {
  return (
    <div ref={props.rideRef} className="absolute hidden w-full">
      <div className="w-full p-2 bg-white shadow-inner shadow-gray-200 flex flex-col gap-2 rounded-t-xl">
        <h4
          className="text-center w-full"
          onClick={() => props.setSelectedRide(false)}
        >
          <i className="ri-arrow-down-wide-line text-xl text-gray-300"></i>
        </h4>
        <div>
          <h3 className="font-semibold">Select a Ride</h3>
        </div>
        <div>
          <div
            onClick={() => {
              props.setConfirmRide(true);
              props.setSelectedRide(false);
            }}
            className="flex items-center gap-2 border-2 active:border-black p-1 rounded-lg"
          >
            <div className="w-20 h-14 flex items-center justify-center">
              <img
                className="w-12 h-8"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm">Uber Car</h3>
              </div>
              <p className=" text-xs">2 mins away</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 font-semibold">$15</p>
                <h3 className="flex items-center gap-1 ">
                  <i className="ri-user-3-line text-sm"></i>
                  <span>4</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => props.setConfirmRide(true)}
          className="w-full active:border-black border-2 rounded-lg p-1"
        >
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 flex items-center justify-center">
              <img
                className="w-12 h-8"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm">Uber Auto</h3>
              </div>
              <p className=" text-xs">2 mins away</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 font-semibold">$10</p>
                <h3 className="flex items-center gap-1 ">
                  <i className="ri-user-3-line text-sm"></i>
                  <span>3</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => props.setConfirmRide(true)}
          className="w-full  active:border-black border-2 rounded-lg p-1"
        >
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 flex items-center justify-center">
              <img
                className="w-12 h-8"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm">Uber Bike</h3>
              </div>
              <p className=" text-xs">2 mins away</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 font-semibold">$5</p>
                <h3 className="flex items-center gap-1 ">
                  <i className="ri-user-3-line text-sm"></i>
                  <span>1</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
SelectRide.propTypes = {
  rideRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  confirmRideRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  setSelectedRide: PropTypes.func.isRequired,
  setConfirmRide: PropTypes.func.isRequired,
};

export default SelectRide;
