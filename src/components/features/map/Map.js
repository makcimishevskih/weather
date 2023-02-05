import "./Map.scss";

import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

import { load } from "@2gis/mapgl";
const GIS_KEY = "cf331a9b-5c40-4b09-800c-627c1cff10f3";

const Map = (width, height) => {
  const { latitude, longitude } = useSelector((state) => state.coords);
  const { city } = useSelector((state) => state.weather);

  useEffect(() => {
    if (!longitude || !latitude) return;

    let map;
    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map-container", {
        center: [longitude, latitude],
        zoom: 13,
        key: GIS_KEY,
      });
      const marker = new mapglAPI.Marker(map, {
        coordinates: map.getCenter(),
        label: {
          text: `Вы здесь ${city}`,
        },
      });
    });
    return () => map && map.destroy();
  }, [latitude, longitude]);

  return (
    <div className="map-wrapper" style={{ width, height }}>
      <div id="map">
        {latitude} {longitude} {city}
        <MapWrapper />
      </div>
    </div>
  );
};

export default Map;

const MapWrapper = memo(
  () => {
    return <div id="map-container"></div>;
  },
  () => true
);
