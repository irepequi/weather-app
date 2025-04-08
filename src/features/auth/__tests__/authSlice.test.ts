import authReducer, { login, logout } from "../authSlice";

describe("authSlice", () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };

  it("should handle login with valid credentials", () => {
    const action = login({
      email: "user@example.com",
      password: "1234",
    });
    const state = authReducer(initialState, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ email: "user@example.com" });
    expect(state.error).toBeNull();
  });

  it("should handle login with invalid credentials", () => {
    const action = login({
      email: "wrong@example.com",
      password: "wrong",
    });
    const state = authReducer(initialState, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe("Invalid credentials");
  });

  it("should handle logout", () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { email: "user@example.com" },
      error: null,
    };
    const action = logout();
    const state = authReducer(loggedInState, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBeNull();
  });
});
