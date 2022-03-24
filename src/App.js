import { useState } from "react";
import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";
import "./styles/index.scss";

function App() {
  const [open, setOpen] = useState(false);

  function handleOpenSidebar() {
    setOpen(true);
  }

  function handleCloseSidebar() {
    setOpen(false);
  }

  return (
    <div className="container">
      <Sidebar open={open} handleClose={handleCloseSidebar} />
      <div className="main active">
        <Navbar handleOpen={handleOpenSidebar} />
      </div>
    </div>
  );
}

export default App;
