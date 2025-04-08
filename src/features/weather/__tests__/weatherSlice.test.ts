import weatherReducer, { setCity, clearWeatherState } from "../weatherSlice";
import type { WeatherState } from "../../../utils/interfaces/typeWeathers";

describe("weatherSlice", () => {
  const initialState: WeatherState = {
    currentCity: "",
    data: null,
    loading: false,
    error: null,
  };

  it("should set the current city", () => {
    const action = setCity("London");
    const state = weatherReducer(initialState, action);

    expect(state.currentCity).toBe("London");
  });

  it("should clear the weather state", () => {
    const populatedState: WeatherState = {
      currentCity: "London",
      data: {
        city: {
          name: "London",
          id: 1,
          coord: { lat: 51.5074, lon: -0.1278 },
          country: "GB",
          population: 8908081,
          timezone: 0,
          sunrise: 1600000000,
          sunset: 1600040000,
        },
        list: [],
      },
      loading: false,
      error: null,
    };
    const action = clearWeatherState();
    const state = weatherReducer(populatedState, action);

    expect(state.currentCity).toBe("");
    expect(state.data).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
