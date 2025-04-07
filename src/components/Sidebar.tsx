import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../features/store";
import { setCity } from "../features/weather/weatherSlice";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state: RootState) => state.weather);
  const { t } = useTranslation();

  const cities = [
    { id: "london", name: t("locations.london") },
    { id: "toronto", name: t("locations.toronto") },
    { id: "singapore", name: t("locations.singapore") },
  ];

  const handleCityChange = (cityId: string) => {
    dispatch(setCity(cityId));
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
