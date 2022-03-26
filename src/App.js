import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";
import SettingsPage from "./pages/SettingsPage";
import "./styles/index.scss";

function App() {
  const [open, setOpen] = useState(false);

  function handleToggleOpen() {
    setOpen(!open);
  }

  return (
    <Router>
      <div className="container">
        <Sidebar open={open} handleToggle={handleToggleOpen} />
        <div className={`main${open ? " active" : ""}`}>
          <Navbar handleOpen={handleToggleOpen} />
          <Routes>
            <Route exact path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
