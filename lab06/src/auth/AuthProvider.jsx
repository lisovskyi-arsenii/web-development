import { useState } from "react";
import Cookies from "js-cookie";
import { AUTH_COOKIE, AUTH_COOKIES_DAYS } from "../config";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  // Lazy initializer reads the cookie on the first render, so a page reload
  // doesn't flash a logged-out state before ProtectedRoute decides.
  const [user, setUser] = useState(() => Cookies.get(AUTH_COOKIE) ?? null);

  const login = (name) => {
    Cookies.set(AUTH_COOKIE, name, {
      expires: AUTH_COOKIES_DAYS,
      sameSite: "strict",
    });
    setUser(name);
  };

  const logout = () => {
    Cookies.remove(AUTH_COOKIE);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
