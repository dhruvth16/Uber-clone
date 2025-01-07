import "remixicon/fonts/remixicon.css";
import PropTypes from "prop-types";

function SearchLocationPanel({
  suggestions,
  onSelectLocation,
  setSelectedRide,
  setInputPanelOpen,
  fetchFare,
  currLocation,
  destLocation,
}) {
  // console.log(typeof suggestions);
  const checkValidInput = () => {
    if (!currLocation || !destLocation) {
      alert("Please enter both pickup and destination locations");
      return false;
    }
    return true;
  };

  const handleFindTrip = () => {
    if (checkValidInput()) {
      setInputPanelOpen(false);
      setSelectedRide(true);
      fetchFare(currLocation, destLocation);
    }
  };
  return (
    <>
      <div className="px-2">
        <button
          onClick={() => handleFindTrip()}
          className="w-full bg-black text-white font-semibold rounded-lg p-1"
        >
          Find a Trip
        </button>
      </div>
      {suggestions.map((address, index) => (
        <div key={index}>
          <div
            onClick={() => {
              onSelectLocation(address.place_name);
              // setSelectedRide(true);
              // setInputPanelOpen(false);
            }}
            className="px-4 py-2 flex items-center gap-2 border-2 border-gray-50 active:border-black p-2 rounded-lg bg-white my-1"
          >
            <h3 className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-200">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <h3 className="text-sm">{address.place_name}</h3>
          </div>
        </div>
      ))}
    </>
  );
}

SearchLocationPanel.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
  setSelectedRide: PropTypes.func.isRequired,
  setInputPanelOpen: PropTypes.func.isRequired,
  fetchFare: PropTypes.func.isRequired,
  currLocation: PropTypes.string.isRequired,
  destLocation: PropTypes.string.isRequired,
};

export default SearchLocationPanel;
