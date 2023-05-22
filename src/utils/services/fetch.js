import { translateWeatherCondition } from "@helpers/helpers";

import {
	ASTRO,
	CITY_DISTRICTS,
	CURRENT_WEATHER,
	FORECAST_10_DAYS,
	DA_DATA,
} from "@services/urls.js";

const fetchCity = async ({ lat, lon }) => {
	const token = "c394ae3ccaaf56f99554ad9c1de4296476218129";
	const query = { lat, lon, count: 1 };

	const options = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Token " + token,
		},
		body: JSON.stringify(query),
	};

	return await fetch(DA_DATA, options)
		.then(response => response.json())
		.then(data => formatData(data))
		.catch(error => new Error("Error. Fetch error: ", error.message));

	function formatData(data) {
		const format = data.suggestions[0].value
			.replace(/ул/i, "Улица")
			.replace(/г/i, "")
			.trim()
			.split(", ")
			.slice(0, 2);

		return format;
	}
};

const fetchAstro = async (city = "Москва") => {
	const y = new Date().getFullYear();
	let m =
		new Date().getMonth() < 10
			? `0${new Date().getMonth()}`
			: new Date().getMonth();
	const d = new Date().getDate();

	const date = `${y}-${m}-${d}`;

	try {
		const response = await fetch(`${ASTRO}&dt=${date}&q=${city}`);

		if (!response.ok) {
			throw new Error(
				`Error.  response error: ${response.ok}.
              Status:${response.status}`,
			);
		}

		const request = await response.json();

		const formatedRequest = formatData(request);

		return formatedRequest;
	} catch (err) {
		throw new Error("Error. Fetch error: ", err.message);
	}

	function formatData(obj) {
		const sunrise = /PM/g.test(obj.astronomy.astro.sunrise)
			? +obj.astronomy.astro.sunrise.slice(0, 2) +
			  12 +
			  obj.astronomy.astro.sunrise.slice(2, 5)
			: obj.astronomy.astro.sunrise.slice(0, 5);

		const sunset = /PM/gi.test(obj.astronomy.astro.sunset)
			? +obj.astronomy.astro.sunset.slice(0, 2) +
			  12 +
			  obj.astronomy.astro.sunset.slice(2, 5)
			: obj.astronomy.astro.sunset.slice(0, 5);

		let moonrise = /PM/i.test(obj.astronomy.astro.moonrise)
			? +obj.astronomy.astro.moonrise.slice(0, 2) +
			  12 +
			  obj.astronomy.astro.moonrise.slice(2, 5)
			: obj.astronomy.astro.moonrise.slice(0, 5);

		let moonset = /No/i.test(obj.astronomy.astro.moonset)
			? obj.astronomy.astro.moonrise.slice(
					0,
					obj.astronomy.astro.moonrise.length - 3,
			  )
			: +obj.astronomy.astro.moonrise.slice(0, 2) +
			  12 +
			  obj.astronomy.astro.moonrise.slice(2, 5);

		const riseH = +sunrise.slice(0, 2);
		const setH = +sunset.slice(0, 2);
		const riseM = +sunrise.slice(3, 5);
		const setM = +sunset.slice(3, 5);

		let diffM = setM - riseM;
		let resH = setH - riseH;
		let resM = 60;

		if (diffM < 0) {
			resH--;
			resM += diffM;
		} else {
			diffM < 10 ? (resM = `0${diffM}`) : (resM = diffM);
		}

		return {
			city: obj.location.name,
			region: obj.location.region,
			country: obj.location.country,
			sunset,
			sunrise,
			moonset,
			moonrise,
			dayLight: `${resH} ч ${resM} мин`,
			moonPhase: obj.astronomy.astro.moon_phase,
			moonIllumination: obj.astronomy.astro.moon_illumination,
		};
	}
};

const fetchForecast = async (city = "Москва") => {
	try {
		const response = await fetch(FORECAST_10_DAYS + city);

		if (!response.ok) {
			throw new Error(
				`Error. Fetch response error: ${response.ok}.
              Status:${response.status}`,
			);
		}

		const request = await response.json();

		const formatedRequest = formatData(request.forecast.forecastday);

		// Заглушка закончилось API на 10 дней
		const fakeWeatherForecast = [
			...formatedRequest,
			...formatedRequest,
			...formatedRequest,
		];

		return fakeWeatherForecast;
	} catch (err) {
		throw new Error("Error. Fetch error: ", err.message);
	}

	function formatData(data) {
		return data.map(el => ({
			date: el.date,
			astro: el.astro,
			day: {
				humidityAvg: el.day.avghumidity,
				tempAvg: el.day.avgtemp_c.toFixed(),
				conditionIcon: el.day.condition.icon,
				conditionText: translateWeatherCondition(el.day.condition.text.trim()),
				maxTemp: el.day.maxtemp_c.toFixed(),
				maxWind: Math.round(el.day.maxwind_kph * (1000 / 3600)),
				minTemp: el.day.mintemp_c.toFixed(),
				uv: el.day.uv,
			},
			hours: [...el.hour],
		}));
	}
};

const fetchDistrics = async (city = "Москва") => {
	try {
		const response = await fetch(`${CITY_DISTRICTS}${city}`);

		if (!response.ok) {
			throw new Error(
				`Error. Fetch response error: ${response.ok}.
              Status:${response.status}`,
			);
		}

		const request = await response.json();

		return request;
	} catch (err) {
		throw new Error("Error. Fetch error: ", err.message);
	}
};

const fetchCitysWeather = async () => {
	const citys = [
		"Краснодар",
		"Новосибирск",
		"Липецк",
		"Калининград",
		"Мурманск",
		"Вологда",
		"Уфа",
		"Красноярск",
	];

	try {
		const request = await Promise.all(
			citys.map(el => fetch(CURRENT_WEATHER + el).then(data => data.json())),
		);
		const formattedRequest = formatData(request);

		return formattedRequest;
	} catch (err) {
		throw new Error("Error. Fetch error: ", err.message);
	}

	function formatData(data) {
		return data.map(el => ({
			city: el.location.name,
			temp: el.current.temp_c.toFixed(),
			conditionIcon: el.current.condition.icon,
			feelsLike: el.current.feelslike_c.toFixed(),

			latitude: el.location.lat,
			longitude: el.location.lon,
			localtime: el.location.localtime,
			uv: el.current.uv,
			isDay: el.current.is_day,
			windDirection: el.current.wind_dir,
			windDegrees: el.current.wind_degree,
			windKph: (el.current.wind_kph * (1000 / 3600)).toFixed(1),
			conditionText: translateWeatherCondition(
				el.current.condition.text.trim(),
			),
			precipMM: el.current.precip_mm,
			pressureMB: el.current.pressure_mb,
			cloud: el.current.cloud,
			gustKph: el.current.gust_kph,
			humidity: el.current.humidity,
			lastUpdated: el.current.last_updated,
		}));
	}
};

const fetchCurrentWeather = async (city = "Москва") => {
	try {
		const response = await fetch(CURRENT_WEATHER + city);

		if (!response.ok) {
			throw new Error(
				`Error. Fetch response error: ${response.ok}.
              Status:${response.status}`,
			);
		}

		const request = await response.json();

		return formatData(request);
	} catch (err) {
		throw new Error("Error. Fetch error: ", err.message);
	}

	function formatData(data) {
		return {
			country: data.location.country,
			city: data.location.name,
			latitude: data.location.lat,
			longitude: data.location.lon,
			localtime: data.location.localtime,
			temp: data.current.temp_c.toFixed(),
			feelsLike: data.current.feelslike_c.toFixed(),
			conditionIcon: data.current.condition.icon,
			conditionText: data.current.condition.text.trim(),
			windKph: (data.current.wind_kph * (1000 / 3600)).toFixed(1),
			windDegrees: data.current.wind_degree,
			windDirection: data.current.wind_dir,
			precipMM: data.current.precip_mm,
			pressureMB: (data.current.pressure_mb * 0.75).toFixed(),
			humidity: data.current.humidity,
			cloud: data.current.cloud,
			gustKph: data.current.gust_kph,
			uv: data.current.uv,
			isDay: data.current.is_day,
			lastUpdated: data.current.last_updated,
		};
	}
};

export const fetchAPI = {
	fetchCurrentWeather,
	fetchCity,
	fetchForecast,
	fetchAstro,
	fetchDistrics,
	fetchCitysWeather,
};
