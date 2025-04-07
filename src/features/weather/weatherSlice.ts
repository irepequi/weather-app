import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { fetchWeatherData } from "../../utils/api";
import type { WeatherState, WeatherData } from "../../utils/interfaces/typeWeathers";

const initialState: WeatherState = {
  currentCity: "",
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk<WeatherData, string>(
  "weather/fetchWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherData(city);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    clearWeatherState: (state) => {
      state.currentCity = "";
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCity, clearWeatherState } = weatherSlice.actions;
export default weatherSlice.reducer;
