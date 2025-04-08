import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import weatherReducer, { setCity } from "../../features/weather/weatherSlice";
import authReducer from "../../features/auth/authSlice";
import languageReducer from "../../features/language/languageSlice";
import type { RootState } from "../../features/store";

describe("Sidebar", () => {
  const createTestStore = (): EnhancedStore<RootState> =>
    configureStore({
      reducer: {
        weather: weatherReducer,
        auth: authReducer,
        language: languageReducer,
      },
      preloadedState: {
        weather: { currentCity: "", data: null, loading: false, error: null },
        auth: { isAuthenticated: true, user: null, error: null },
        language: { current: "en" },
      } as RootState,
    });

  it("should render the list of cities", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/london/i)).toBeInTheDocument();
    expect(screen.getByText(/toronto/i)).toBeInTheDocument();
    expect(screen.getByText(/singapore/i)).toBeInTheDocument();
  });

  it("should dispatch setCity when a city is clicked", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/london/i));
    
    expect(store.getState().weather.currentCity).toBe("london");
  });

  it("should highlight the active city", () => {
    const store = createTestStore();
    store.dispatch(setCity("toronto"));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );

    const activeCityButton = screen.getByText(/toronto/i);
    expect(activeCityButton).toHaveClass("active");
  });
});
