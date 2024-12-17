import { Link } from "react-router";

const Riding = () => {
  return (
    <div className="h-screen">
      <div>
        <img
          className="h-1/2 w-full"
          src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/7be2be6f43f64c27946d1068a602ece1.gif"
          alt=""
        />
      </div>
      <Link
        to="/home"
        className="absolute top-1 right-1 h-7 w-7 rounded-full bg-white flex items-center justify-center "
      >
        <i className="ri-home-3-line text-xl"></i>
      </Link>
      <div className="p-2 border-b-[1px]">
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
        <div className="p-2">
          <h3 className="text-sm text-gray-600">Driver Name</h3>
          <h3 className="font-semibold">Vehicle No.</h3>
          <h3 className="text-sm text-gray-600">Vehicle Details</h3>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 ">
        <div>
          <i className="ri-focus-3-fill"></i>{" "}
        </div>
        <div>
          <h3 className="font-semibold text-sm">Destination Location</h3>
          <p className="text-xs text-gray-600">456, Lorem Ipsum</p>
        </div>
      </div>
      <div className="p-2 absolute w-full bottom-2">
        <button className="w-full bg-black text-white font-semibold rounded-lg p-1">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
