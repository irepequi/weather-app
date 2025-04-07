import { useTranslation } from "react-i18next";
import type { WeatherItem } from "../utils/interfaces/typeWeathers";

interface WeatherCardProps {
  item: WeatherItem;
}

const WeatherCard = ({ item }: WeatherCardProps) => {
  const { t } = useTranslation();

  const formatTime = (dateText: string) => {
    const date = new Date(dateText);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="weather-card">
      <div className="weather-card__time">{formatTime(item.dt_txt)}</div>
      <div className="weather-card__icon">
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt={item.weather[0].description}
        />
      </div>
      <div className="weather-card__description">
        {item.weather[0].description}
      </div>
      <div className="weather-card__temp">
        <div className="weather-card__temp-main">
          {Math.round(item.main.temp)}°C
        </div>
        <div className="weather-card__temp-range">
          <span className="weather-card__temp-min">
            {t("minTemp")}: {Math.round(item.main.temp_min)}°C
          </span>
          <span className="weather-card__temp-max">
            {t("maxTemp")}: {Math.round(item.main.temp_max)}°C
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
