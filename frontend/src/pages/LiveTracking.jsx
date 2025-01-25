import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";

const INITIAL_ZOOM = 10.12;
const INITIAL_CENTER = [77.216721, 28.6448];

function LiveTracking() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const markerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = `${import.meta.env.VITE_MAP_ACCESS_TOKEN}`;

    // Initialize the Mapbox map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      const lngLat = [lng, lat];
      markerRef.current = new mapboxgl.Marker()
        .setLngLat(lngLat)
        .addTo(mapRef.current);

      markerRef.current.setLngLat([lng, lat]);
      setCenter([lng, lat]);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div
        className="h-3/4 w-full object-cover absolute"
        id="map-container"
        ref={mapContainerRef} // Attach the map container ref to the div
      />
    </>
  );
}

LiveTracking.propTypes = {
  lngLat: PropTypes.object.isRequired,
};

export default LiveTracking;
