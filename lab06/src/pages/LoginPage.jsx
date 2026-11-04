import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../auth/useAuth";
import { VALID_LOGIN, VALID_PASSWORD } from "../config";
import { DASHBOARD } from "../routes";

const EMPTY_ERRORS = { username: "", password: "", form: "" };

export default function LoginPage() {
  const navigate = useNavigate();

  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(EMPTY_ERRORS);

  const handleLoginChange = (e) => {
    setUsername(e.target.value);
    setErrors((prev) => ({ ...prev, username: "", form: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "", form: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      setErrors({
        username: trimmedUsername ? "" : "Username is required",
        password: password ? "" : "Password is required",
        form: "",
      });
      return;
    }

    if (trimmedUsername !== VALID_LOGIN || password !== VALID_PASSWORD) {
      setErrors({ ...EMPTY_ERRORS, form: "Invalid username or password" });
      return;
    }

    login(trimmedUsername);
    navigate(DASHBOARD);
  };

  // Already logged in → skip the login page. Must stay after all hooks.
  if (user) return <Navigate to={DASHBOARD} replace />;

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div>
          <h1 className="login-form__title">Sign in</h1>
          <p className="login-form__hint">
            Use your name and course number, e.g. mark5
          </p>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="login">
            Username
          </label>
          <input
            id="login"
            className="field__input"
            type="text"
            autoComplete="username"
            value={username}
            onChange={handleLoginChange}
            aria-invalid={Boolean(errors.username)}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="field__input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {errors.form && (
          <p className="error-text" role="alert">
            {errors.form}
          </p>
        )}

        <button className="button" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}
