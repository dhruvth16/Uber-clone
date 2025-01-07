import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";

const INITIAL_CENTER = [-74.0242, 40.6941];
const INITIAL_ZOOM = 10.12;

function LiveTracking() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    mapboxgl.accessToken = `${import.meta.env.VITE_MAP_ACCESS_TOKEN}`;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    mapRef.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      // update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [center, zoom]);

  return (
    <>
      <div
        className="h-screen w-full object-cover"
        id="map-container"
        ref={mapContainerRef}
      />
    </>
  );
}

LiveTracking.propTypes = {
  rideConfrimed: PropTypes.object.isRequired,
};

export default LiveTracking;
