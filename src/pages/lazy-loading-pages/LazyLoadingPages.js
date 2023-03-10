import { lazy } from "react";

export const TenDaysWeatherPage = lazy(() => import("@core/ten-days-weather"));
export const CityNotFoundPage = lazy(() => import("@core/city-not-found"));
export const ErrorPage = lazy(() => import("@core/error"));
