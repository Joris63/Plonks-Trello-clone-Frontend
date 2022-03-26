import { useState } from "react";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/index.scss";

const AuthLayout = () => {
  return <Outlet />;
};

const DefaultLayout = () => {
  const [open, setOpen] = useState(false);

  function handleToggleOpen() {
    setOpen(!open);
  }

  return (
    <div className="container">
      <Sidebar open={open} handleToggle={handleToggleOpen} />
      <div className={`main${open ? " active" : ""}`}>
        <Navbar handleOpen={handleToggleOpen} />
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route exact path="/settings" element={<SettingsPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route exact path="/login" element={<AuthPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
