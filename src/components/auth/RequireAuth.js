import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navigation/Navbar";
import Sidebar from "../navigation/Sidebar";

const RequireAuth = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { auth } = useAuth();
  const location = useLocation();

  function handleToggleOpen() {
    setDrawerOpen(!drawerOpen);
  }

  return auth?.user ? (
    <div className="container">
      <Sidebar open={drawerOpen} handleToggle={handleToggleOpen} />
      <div className={`main${drawerOpen ? " active" : ""}`}>
        <Navbar handleOpen={handleToggleOpen} />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
