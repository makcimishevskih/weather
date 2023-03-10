export const BASE_URL = "https://api.weatherapi.com/v1/";
export const API_KEY = "?key=1719a76129b146dd890191501232201";
export const AIR_QUAL = "&aqi=yes";

export const CURRENT_WEATHER = `${BASE_URL}current.json${API_KEY}${AIR_QUAL}&q=`;
export const FORECAST_10_DAYS = `${BASE_URL}forecast.json${API_KEY}${AIR_QUAL}&days=10&alerts=no&q=`;
export const CITY_DISTRICTS = `${BASE_URL}search.json${API_KEY}&q=`;
export const ASTRO = `${BASE_URL}astronomy.json${API_KEY}`;

export const DA_DATA = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address`;
