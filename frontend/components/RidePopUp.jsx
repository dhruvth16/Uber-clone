import Proptypes from "prop-types";

function RidePopUp(props) {
  return (
    <div
      ref={props.ignoreRideRef}
      className="h-1/2 absolute p-2 bg-white shadow-inner shadow-gray-200 rounded-t-lg w-full"
    >
      <div className="absolute h-14 w-14 top-[-35px] bg-gray-100 flex items-center justify-center rounded-full">
        <img
          className="h-10 w-10 rounded-full"
          src="https://t4.ftcdn.net/jpg/06/78/09/75/360_F_678097580_mgsNEISedI7fngOwIipYtEU0T6SN8qKv.jpg"
          alt=""
        />
      </div>
      <div className="text-right bg-gray-50 p-1 rounded-lg">
        <p className="font-medium text-sm">Carlsen</p>
        <p className="text-sm font-semibold">DL 1A 0001</p>
      </div>
      <div className="border-[1px] mt-3 border-yellow-300 p-2 rounded-lg relative">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-600 mb-1">Ride Details</h3>
          <h3 className="font-semibold text-sm">5 KM</h3>
        </div>
        <div>
          <div className="h-8 top-[60px] left-[35px] w-[2px] absolute bg-black"></div>
          <div className="h-2 w-2 absolute left-[31px] top-[55px] bg-black rounded-full"></div>
          <p className="px-10 py-1 mb-2 bg-gray-50 rounded-md text-sm overflow-hidden overflow-x-auto">
            Barkakana
          </p>
        </div>
        <div>
          <div className="h-2 w-2 absolute left-[31px] top-[98px] border-2 border-yellow-400"></div>
          <p className="px-10 py-1 bg-gray-50 rounded-md text-sm overflow-hidden overflow-x-auto">
            Ramgarh
          </p>
        </div>
      </div>
      <p className="p-2 mt-2 font-medium text-sm">
        Accept the ride for $10 or reject it...?
      </p>
      <div className="flex items-center gap-2 mt-2">
        <div
          onClick={() => props.setAcceptRide(true)}
          className="w-1/2 p-1 bg-black rounded-lg text-center  bottom-1"
        >
          <button className="font-semibold text-white ">Accept</button>
        </div>
        <div
          onClick={() => props.setIgnoreRide(false)}
          className="w-1/2 p-1 bg-gray-200 rounded-lg text-center  bottom-1"
        >
          <button className="font-semibold">Ignore</button>
        </div>
      </div>
    </div>
  );
}

RidePopUp.propTypes = {
  setAcceptRide: Proptypes.func.isRequired,
  setIgnoreRide: Proptypes.func.isRequired,
  ignoreRideRef: Proptypes.object.isRequired,
};

export default RidePopUp;
