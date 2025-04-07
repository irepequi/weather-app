import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../features/store";
import { fetchWeather, setCity } from "../features/weather/weatherSlice";

const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentCity } = useSelector((state: RootState) => state.weather);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  

  const cities = [
    { id: "london", name: t("locations.london") },
    { id: "toronto", name: t("locations.toronto") },
    { id: "singapore", name: t("locations.singapore") },
  ];

  // Reset city when navigating to the contact page
  useEffect(() => {
    if (location.pathname === "/contact") {
      dispatch(setCity(""));
    }
  }, [location, dispatch]);

  const handleCityChange = (cityId: string) => {
    dispatch(setCity(cityId));
    dispatch(fetchWeather(cityId));
    navigate("/dashboard");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <h3 className="sidebar__title">{t("cities")}</h3>
        <ul className="sidebar__list">
          {cities.map((city) => (
            <li key={city.id} className="sidebar__item">
              <button
                className={`sidebar__btn ${currentCity === city.id ? "active" : ""}`}
                onClick={() => handleCityChange(city.id)}
              >
                {city.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__section">
        <Link to="/contact" className="sidebar__link">
          {t("contact")}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
