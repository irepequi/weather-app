import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../features/store";
import { fetchWeather } from "../features/weather/weatherSlice";

import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import WeatherCard from "../components/WeatherCard";


const DashboardPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { currentCity, data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (currentCity) dispatch(fetchWeather(currentCity));
  }, [dispatch, currentCity]);

  // Group weather data by day
  const getTodayForecasts = () => {
    if (!data || !data.list) return [];

    const today = new Date().toISOString().split("T")[0];
    return data.list.filter((item) => item.dt_txt.includes(today));
  };

  const todayForecasts = getTodayForecasts();

  return (
    <div className="page dashboard-page">
      <Header isAuthenticated={isAuthenticated} />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          <h1 className="dashboard-title">
            {t("messages.weatherForecast")} - {data?.city?.name || currentCity}
          </h1>

          {loading && <div className="loading">Loading...</div>}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && (
            <div className="weather-cards">
              {todayForecasts.length > 0 ? (
                todayForecasts.map((item, index) => (
                  <WeatherCard key={index} item={item} />
                ))
              ) : (
                <div className="no-data">{t("noForecastData")}</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
