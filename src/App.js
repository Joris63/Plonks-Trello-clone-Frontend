import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import PersistLogin from "./components/auth/PersistLogin";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/index.scss";
import UserBoardsPage from "./pages/UserBoardsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<AuthPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<div />} />
            <Route path="/boards" element={<UserBoardsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
