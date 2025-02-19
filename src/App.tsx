import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm"
import { getWeather } from "./services/weatherService";
import { Weather } from "./types";
import WeatherMap from "./components/WeatherMap";
import TemperatureChart from "./components/TemperatureChart";
import DaySelector from './components/DaySelector';
import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';


function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [lon, setLon] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  useEffect(() => {
    if (weather?.city.name) {
      handleSearch(weather.city.name);
    }
  }, [unit]);

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
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" align="center" color="primary" >
            Weather Forecast
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <SearchForm onSearch={handleSearch} />
                  <IconButton
                    onClick={toggleUnit}
                    color="primary"
                    sx={{
                      height: 56,
                      width: 56,
                      mt: '0 !important'
                    }}
                  >
                    <ThermostatIcon />
                    <Typography variant="button" sx={{ ml: 1 }}>
                      {unit === "metric" ? "°C" : "°F"}
                    </Typography>
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2, bgcolor: '#ffebee' }}>
                  <Typography color="error">{error}</Typography>
                </Paper>
              </Grid>
            )}
            {weather ? (
              <>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
                        <DaySelector
                          days={days}
                          selectedDay={selectedDay}
                          onDaySelect={setSelectedDay}
                          temperatures={groupedByDay}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
                        {lat && lon && (
                          <WeatherMap lat={lat} lon={lon} city={weather.city.name} />
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <TemperatureChart
                      temperatures={selectedDayTemperatures}
                      unit={unit}
                      labels={selectedDayHours}
                    />
                  </Paper>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 4 }}>
                  <Typography variant="h6" align="center" color="text.secondary">
                    Enter a city name to see weather forecast
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default App
