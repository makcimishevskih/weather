import "./Map.scss";

import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { string } from "prop-types";

import { load } from "@2gis/mapgl";

const GIS_KEY = "cf331a9b-5c40-4b09-800c-627c1cff10f3";

const Map = () => {
  const { latitude, longitude } = useSelector((state) => state.coords);

  useEffect(() => {
    let map;
    let marker;
    // load()
    //   .then((mapglAPI) => {
    //     map = new mapglAPI.Map("map-container", {
    //       center: [longitude, latitude],
    //       zoom: 13,
    //       key: GIS_KEY,
    //     });

    //     return mapglAPI;
    //   })
    //   .then((mapglAPI) => {
    //     marker = new mapglAPI.Marker(map, {
    //       coordinates: map.getCenter(),
    //       label: {
    //         text: `Вы здесь`,
    //       },
    //     });
    //   });
    // return () => {
    //   map && map.destroy();
    //   marker && marker.destroy();
    // };
  }, [latitude, longitude]);

  return (
    <div className="wrapper">
      <div id="map" className="map" style={{ height: "100%" }}>
        <MapWrapper />
      </div>
    </div>
  );
};

export default Map;

const MapWrapper = memo(
  () => {
    return (
      <div
        id="map-container"
        className="map-container"
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  },
  () => true
);

Map.propTypes = {
  width: string,
  height: string,
};
