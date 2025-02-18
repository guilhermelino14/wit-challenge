import { useState } from "react";
import SearchForm from "./components/SearchForm"
import { getWeather } from "./services/weatherService";
import { Weather } from "./types";
import WeatherMap from "./components/WeatherMap";
import TemperatureChart from "./components/TemperatureChart";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [lon, setLon] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const handleSearch = async (city: string) => {
    setWeather(null);
    setError(null);
    try {
      const data = await getWeather(city, unit);
      setWeather(data.forecastData);
      console.log(data);
      setLat(data.datalat);
      setLon(data.datalon);
    } catch (err) {
      setError(err instanceof Error ? err.message : "City not found");
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    handleSearch(weather?.city.name || "");
  };

  const groupedByDay = weather?.list?.reduce((acc: Record<string, Array<{ hour: string, temp: number }>>, forecast: any) => {
    const date = forecast.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      hour: forecast.dt_txt.split(' ')[1],
      temp: forecast.main.temp
    });
    return acc;
  }, {}) || {};

  const days = Object.keys(groupedByDay);

  // Get temperatures for the selected day
  const selectedDayTemperatures = days[selectedDay]
    ? groupedByDay[days[selectedDay]].map((item: any) => item.temp)
    : [];

  const selectedDayHours = days[selectedDay]
    ? groupedByDay[days[selectedDay]].map((item: any) => item.hour)
    : [];


  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <button onClick={toggleUnit}>
        Change to {unit === "metric" ? "°F" : "°C"}
      </button>
      {error && <p>{error}</p>}
      {weather ? (
        <div>
          <h2>{weather.city.name}</h2>
          <ul>
            {weather.list.map((item: any) => (
              <li key={item.dt}>
                <strong>{item.dt_txt}</strong> - {item.main.temp} {unit === "metric" ? "°C" : "°F"}
                {item?.coord}
              </li>
            ))}
          </ul>
          {lat && lon && <WeatherMap lat={lat} lon={lon} city={weather.city.name} />}

          <div style={{ marginBottom: '20px' }}>
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(index)}
                style={{
                  margin: '0 5px',
                  backgroundColor: selectedDay === index ? '#007bff' : '#ffffff',
                  color: selectedDay === index ? '#ffffff' : '#000000',
                  padding: '5px 10px',
                  border: '1px solid #007bff',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {new Date(day).toLocaleDateString()}
              </button>
            ))}
          </div>
          <TemperatureChart
            temperatures={selectedDayTemperatures}
            unit={unit}
            labels={selectedDayHours}
          />
        </div>
      ) : (
        <p>No weather data</p>
      )}
    </>
  )
}

export default App
