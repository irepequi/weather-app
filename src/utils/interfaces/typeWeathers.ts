export interface WeatherCity {
  name: string;
  id: number;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  city: WeatherCity;
  list: WeatherItem[];
}

export interface WeatherItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherState {
  currentCity: string;
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}


