import "./Home.scss";
import { Suspense, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGeolocated } from "react-geolocated";
import { useSpring, animated } from "@react-spring/web";

import { Outlet, useSearchParams } from "react-router-dom";
import Header from "@layout/header";
import Footer from "@layout/footer";
import Loader from "@features/ui/loader";

import { fetchAPI } from "@services/fetch.js";

import { coordsActions } from "@redux/slices/coordsSlice.js";
import { weatherActions, asyncActions } from "@redux/slices/weatherSlice.js";

function Home() {
  const { city, loading } = useSelector((state) => state.weather);
  const { latitude, longitude } = useSelector((state) => state.coords);
  const dispatch = useDispatch();

  let [, setSearchParams] = useSearchParams();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 1000,
    watchPosition: true,
  });

  let lat = useMemo(() => coords?.latitude ?? latitude ?? 0);
  let lon = useMemo(() => coords?.longitude ?? longitude ?? 0);

  useEffect(() => {
    fetchAPI.fetchCity({ lat, lon }).then((data) => {
      dispatch(weatherActions.getCity(data));
      dispatch(coordsActions.getCoords([lat, lon]));
      setSearchParams({ lat, lon });
    });
  }, [coords]);

  useEffect(() => {
    if (city) {
      dispatch(asyncActions.fetchWeatherInitAppAction(city));
    }
  }, [city]);

  const stylesAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    delay: 500,
  });

  return (
    <div className="home">
      <Header />

      <Suspense fallback={<Loader width={"100px"} height={"100px"} />}>
        <animated.div className="outlet" style={stylesAnimation}>
          {loading === "loading" ? (
            <Loader width={"100px"} height={"100px"} />
          ) : (
            <Outlet />
          )}
        </animated.div>
      </Suspense>

      <Footer />
    </div>
  );
}

export default Home;
