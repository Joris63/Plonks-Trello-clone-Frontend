import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import "./styles/index.scss";
const App = () => {
  const isAuthenticated = false;
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleToggleOpen() {
    setDrawerOpen(!drawerOpen);
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <Router>
      <div className="container">
        <Sidebar open={drawerOpen} handleToggle={handleToggleOpen} />
        <div className={`main${drawerOpen ? " active" : ""}`}>
          <Navbar handleOpen={handleToggleOpen} />
          <Routes>
            <Route exact path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
