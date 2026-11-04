import { FORECAST_DAYS } from "../config";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchForecast({ latitude, longitude }, signal) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    forecast_days: FORECAST_DAYS,
    timezone: "auto",
  });

  const result = await fetch(`${FORECAST_URL}?${params}`, { signal });
  if (!result.ok) {
    throw new Error("Invalid response");
  }

  const { daily } = await result.json();
  return daily.time.map((date, i) => ({
    date,
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    code: daily.weather_code[i],
  }));
}

export { fetchForecast };
