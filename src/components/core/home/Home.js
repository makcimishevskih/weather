import "./Home.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGeolocated } from "react-geolocated";

import { Outlet, useSearchParams } from "react-router-dom";

import Header from "@layout/header";
import Footer from "@layout/footer";

import { fetchAPI } from "@services/fetch.js";

import { coordsActions } from "@redux/slices/coordsSlice.js";

import { weatherActions } from "@redux/slices/weatherSlice.js";
import { asyncActions } from "@redux/slices/weatherSlice.js";
import Loader from "@features/loader";

import { useSpring, animated } from "@react-spring/web";

function Home() {
  const { loading, city } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 1000,
  });

  useEffect(() => {
    if (coords?.latitude && coords?.longitude && coords) {
      const { latitude, longitude } = coords;

      Promise.all([
        fetchAPI.fetchCity(latitude, longitude).then((data) => {
          dispatch(weatherActions.getCity(data));
        }),
        dispatch(coordsActions.getCoords([latitude, longitude])),
      ]);
      setSearchParams({ lat: coords.latitude, lon: coords.longitude });
    }
  }, [coords]);

  useEffect(() => {
    if (city) {
      Promise.all([
        dispatch(asyncActions.fetchCurrentWeatherAction(city)),
        dispatch(asyncActions.fetchForecastAction(city)),
        dispatch(asyncActions.fetchAstroAction(city)),
        dispatch(asyncActions.fetchDistrictsAction(city)),
        dispatch(asyncActions.fetchCitysWeatherAction()),
      ]);
    }
  }, [city]);

  const styles = useSpring({
    from: {
      opacity: 0,
      scale: [0.5, 0.5, 0.5],
    },
    to: {
      opacity: 1,
      scale: [1, 1, 1],
    },
    delay: 500,
  });

  console.log("render");

  return (
    <animated.div className="home" style={styles}>
      <Header />

      <Outlet />
      <Footer />
    </animated.div>
  );
}

export default Home;
