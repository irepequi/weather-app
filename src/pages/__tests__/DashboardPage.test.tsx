import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import DashboardPage from "../DashboardPage";
import weatherReducer from "../../features/weather/weatherSlice";
import authReducer from "../../features/auth/authSlice";

describe("DashboardPage", () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        weather: weatherReducer,
        auth: authReducer,
      },
      preloadedState: {
        weather: {
          currentCity: "London",
          data: null,
          loading: true,
          error: null,
        },
        auth: { isAuthenticated: true, user: null, error: null },
      },
    });

  it("should render the dashboard with weather data", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/weather forecast/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});