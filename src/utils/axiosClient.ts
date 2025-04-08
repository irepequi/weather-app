import axios from "axios";

const API_KEY =
  globalThis.importMeta?.env?.VITE_WEATHER_API_KEY ||
  process.env.VITE_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error("API key for OpenWeatherMap is not defined.");
}

const axiosClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export default axiosClient;
