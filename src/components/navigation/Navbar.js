import { useEffect, useRef, useState } from "react";
import Dropdown from "../helpers/Dropdown";
import "../../styles/navigation.scss";
import "animate.css";

const RightNavbar = (props) => {
  const [wiggle, setWiggle] = useState(false);
  const [open, setOpen] = useState(false);

  const profileBtnRef = useRef(null);

  /*
  Wiggle animation for notification bell

  useEffect(() => {
    const interval = setInterval(() => {
      setWiggle(true);

      setTimeout(() => setWiggle(false), 1500);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  */

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <div className="navbar_right">
        <button
          className={`animate__animated${
            wiggle ? " animate__wobble " : " "
          }navbar_icon_btn badge`}
        >
          <i className="fa-regular fa-bell"></i>
        </button>
        <button
          className="navbar_profile_btn"
          onClick={toggleOpen}
          ref={profileBtnRef}
        >
          <div className="navbar_profile_picture">
            <i className="fa-solid fa-j"></i>
          </div>
          <div className="navbar_profile_name">Joris Kamminga</div>
          <span className="navbar_profile_icon">
            <i className={`fa-regular fa-angle-${open ? "up" : "down"}`}></i>
          </span>
        </button>
      </div>
      <Dropdown open={open} anchor={profileBtnRef} handleClose={toggleOpen} />
    </>
  );
};

const Navbar = ({ handleOpen }) => {
  return (
    <div className="navbar">
      <button className="navbar_icon_btn" onClick={handleOpen}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <RightNavbar />
    </div>
  );
};

export default Navbar;
