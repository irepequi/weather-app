import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import weatherReducer from "../../features/weather/weatherSlice";
import languageReducer from "../../features/language/languageSlice";
import { Provider } from "react";

describe("ContactPage", () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        auth: authReducer,
        weather: weatherReducer,
        language: languageReducer,
      },
      preloadedState: {
        auth: { isAuthenticated: true, user: null, error: null },
        weather: { currentCity: "", data: null, loading: false, error: null },
        language: { current: "en" },
      },
    });

  it("should render the contact form", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it("should show validation errors for invalid inputs", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText(/send/i));

    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  it("should submit the form when all fields are valid", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.click(screen.getByText(/send/i));

    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
  });
});