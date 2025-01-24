import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

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
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    markerRef.current = new mapboxgl.Marker()
      .setLngLat(INITIAL_CENTER)
      .addTo(mapRef.current);

    mapRef.current.on("load", () => {
      const customMarker = document.createElement("div");
      customMarker.style.backgroundColor = "red";
      customMarker.style.width = "20px";
      customMarker.style.height = "20px";
      customMarker.style.borderRadius = "50%";
      customMarker.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)";

      markerRef.current = new mapboxgl.Marker({ element: customMarker })
        .setLngLat(INITIAL_CENTER)
        .addTo(mapRef.current);

      mapRef.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        markerRef.current.setLngLat([lng, lat]);
        setCenter([lng, lat]);
      });
    });

    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
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
        className="h-3/4 w-full object-cover"
        id="map-container"
        ref={mapContainerRef}
      />
    </>
  );
}

export default LiveTracking;
