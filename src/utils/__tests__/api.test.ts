import { fetchWeatherData } from "../api";

describe("fetchWeatherData", () => {
  it("should fetch weather data successfully", async () => {
    const data = await fetchWeatherData("London");

    expect(data.city.name).toBe("London");
    expect(data.list[0].main.temp).toBe(15);
  });

  it("should throw an error if the API request fails", async () => {
    await expect(fetchWeatherData("InvalidCity")).rejects.toThrow(
      "Failed to fetch weather data"
    );
  });
});
