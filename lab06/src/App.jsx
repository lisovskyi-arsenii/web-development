import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { DASHBOARD, LOGIN } from "./routes";

function App() {
  return (
    <Routes>
      <Route path={LOGIN} element={<LoginPage />} />
      <Route
        path={DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={LOGIN} replace />} />
    </Routes>
  );
}

export default App;
