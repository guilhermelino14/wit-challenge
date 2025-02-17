const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;

export const getWeather = async (city: string, unit: "metric" | "imperial") => {
  try {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`);
    if (!response.ok) {
      throw new Error("City not found.");
    }

    const cityData = await response.json();
    const { coord } = cityData;

    const forecastResponse = await fetch(`${BASE_URL}/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=${unit}`);
    if (!forecastResponse.ok) {
      throw new Error("Error getting city weather");
    }

    return await forecastResponse.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred");
  }
};

