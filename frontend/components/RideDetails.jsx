function RideDetails() {
  return (
    <div className="absolute bottom-0 hidden w-full bg-white">
      <div className="w-full p-2 bg-white shadow-inner shadow-gray-200 flex flex-col gap-2 rounded-t-xl">
        <h4 className="text-center w-full">
          <i className="ri-arrow-down-wide-line text-xl text-gray-300"></i>
        </h4>
        <div>
          <h3 className="font-semibold text-left">Meet at the Pick-up point</h3>
        </div>
      </div>
      <div className="w-full bg-gray-300 h-[1px]"></div>
      <div className="flex items-center justify-between gap-2 p-2">
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
        <div className="p-2">
          <h3 className="text-sm text-gray-600">Driver Name</h3>
          <h3 className="font-semibold">Vehicle No.</h3>
          <h3 className="text-sm text-gray-600">Vehicle Details</h3>
        </div>
      </div>
      <div className="w-full bg-gray-300 h-[1px]"></div>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2 p-2">
          <div>
            <i className="ri-map-pin-fill"></i>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Pick-up Location</h3>
            <p className="text-xs text-gray-600">123, Lorem Ipsum</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">$10</h3>
        </div>
      </div>
    </div>
  );
}

export default RideDetails;
