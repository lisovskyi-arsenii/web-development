import { formatDate } from "../utils/formatDate";
import { getWeatherInfo } from "../utils/weatherCodes";

// `+ 0` turns -0 (the API returns e.g. -0.0) into 0, so it never renders as "-0°".
const formatTemp = (value) => `${Math.round(value) + 0}°`;

export default function WeatherCard({ date, min, max, code }) {
  const { label, icon } = getWeatherInfo(code);
  const formattedDate = formatDate(date);

  return (
    <article className="weather-card">
      <h3 className="weather-card__date">{formattedDate}</h3>
      <span className="weather-card__icon" aria-hidden="true">
        {icon}
      </span>
      <p className="weather-card__label">{label}</p>
      <p className="weather-card__temp">
        <span className="weather-card__max" title="Max temperature">
          {formatTemp(max)}
        </span>
        <span className="weather-card__min" title="Min temperature">
          {formatTemp(min)}
        </span>
      </p>
    </article>
  );
}
