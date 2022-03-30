import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/index.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<AuthPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<div />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
