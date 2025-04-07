import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

// Predefined credentials
const validCredentials = {
  email: import.meta.env.VITE_AUTH_EMAIL,
  password: import.meta.env.VITE_AUTH_PASSWORD,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
      }>
    ) => {
      const { email, password } = action.payload;

      // Valid credentials predefined above
      if (
        email === validCredentials.email &&
        password === validCredentials.password
      ) {
        state.isAuthenticated = true;
        state.user = { email };
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.error = "Invalid credentials";
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
