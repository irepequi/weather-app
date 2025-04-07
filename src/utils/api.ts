import type { WeatherData } from "./interfaces/typeWeathers";
import axiosClient from "./axiosClient";

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axiosClient.get<WeatherData>("/forecast", {
      params: { q: city },
    });
    return response.data;
    
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};
