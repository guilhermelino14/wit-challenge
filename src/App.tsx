import { useState } from "react";
import SearchForm from "./components/SearchForm"
import { getWeather } from "./services/weatherService";
import { Weather } from "./types";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const handleSearch = async (city: string) => {
    setWeather(null);
    setError(null);
    try {
      const data = await getWeather(city, unit);
      setWeather(data);
      console.log(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "City not found");
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    handleSearch(weather?.city.name || "");
  };

  return (
    <>
    
      Hello World
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
                <strong>{new Date(item.dt * 1000).toLocaleDateString()}</strong> - {item.main.temp} {unit === "metric" ? "°C" : "°F"}
                {item?.coord}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No weather data</p> 
      )}
    </>
  )
}

export default App
