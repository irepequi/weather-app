import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "./features/store";

import "./styles/global.scss";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/contact"
          element={isAuthenticated ? <ContactPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
