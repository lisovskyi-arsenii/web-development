import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchForecast } from "../api/weather";
import { useAuth } from "../auth/useAuth";
import Loader from "../components/Loader";
import WeatherCard from "../components/WeatherCard";
import { useGeolocation } from "../hooks/useGeolocation";
import { LOGIN } from "../routes";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { coords, isLocating, isFallback } = useGeolocation();
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) return;

    const controller = new AbortController();

    fetchForecast({ latitude, longitude }, controller.signal)
      .then(setDays)
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Couldn't load the forecast. Please try again later.");
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [latitude, longitude]);

  const handleLogout = () => {
    logout();
    navigate(LOGIN);
  };

  const renderContent = () => {
    if (isLocating) return <Loader text="Detecting your location…" />;
    if (isLoading) return <Loader text="Loading forecast…" />;
    if (error) {
      return (
        <p className="status error-text" role="alert">
          {error}
        </p>
      );
    }

    const locationLabel = isFallback ? "Kyiv" : "Your location";
    const locationNote = isFallback
      ? "Location access unavailable, showing Kyiv"
      : `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

    return (
      <>
        <div className="dashboard__heading">
          <h2 className="dashboard__location">{locationLabel}</h2>
          <p className="dashboard__subtitle">
            5-day forecast · {locationNote}
          </p>
        </div>
        <section className="forecast" aria-label="5-day forecast">
          {days.map((day) => (
            <WeatherCard key={day.date} {...day} />
          ))}
        </section>
      </>
    );
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <h1 className="topbar__title">Weather</h1>
        <div className="topbar__user">
          <span className="topbar__name">{user}</span>
          <button
            className="button button--ghost"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>
      <main>{renderContent()}</main>
    </div>
  );
}
