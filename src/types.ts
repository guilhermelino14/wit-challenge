export interface Weather {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number; // Timestamp
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export interface SearchFormProps {
  onSearch: (city: string) => void;
}

export interface WeatherMapProps {
  lat: number;
  lon: number;
  city: string;
}

export interface TemperatureChartProps{
  temperatures: number[];
  unit: "metric" | "imperial";
  labels?: string[]
}