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
