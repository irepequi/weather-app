import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import weatherReducer from "./weather/weatherSlice";
import languageReducer from "./language/languageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
