import "remixicon/fonts/remixicon.css";
import PropTypes from "prop-types";

function SearchLocationPanel(props) {
  const addresses = [
    "Chaingada Ambatand, Jharkhand",
    "Chaingada Ambatand, Jharkhand",
  ];

  return (
    <>
      {addresses.map((address, index) => (
        <div key={index}>
          <div
            ref={props.rideRef}
            onClick={() => {
              props.setSelectedRide(true);
              props.setInputPanelOpen(false);
            }}
            className="px-4 py-2 flex items-center gap-2 border-2 border-gray-50 active:border-black p-2 rounded-lg bg-white my-1"
          >
            <h3 className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-200">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <h3 className="text-sm">{address}</h3>
          </div>
        </div>
      ))}
    </>
  );
}
SearchLocationPanel.propTypes = {
  setSelectedRide: PropTypes.func.isRequired,
  rideRef: PropTypes.object.isRequired,
  setInputPanelOpen: PropTypes.func.isRequired,
};

export default SearchLocationPanel;
