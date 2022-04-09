import useAuth from "../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import { useRef, useState } from "react";

const RightNavbar = (props) => {
  //const [wiggle, setWiggle] = useState(false);
  const wiggle = false;
  const [open, setOpen] = useState(false);

  const { auth } = useAuth();

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
          {auth?.user?.picturePath ? (
            <img
              className="navbar_profile_picture"
              src={auth?.user?.picturePath}
              alt="profile"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="navbar_profile_picture">
              <i
                className={`fa-solid fa-${auth?.user?.username?.charAt()}`}
              ></i>
            </div>
          )}
          <div className="navbar_profile_name">{auth?.user?.username}</div>
          <span className="navbar_profile_icon">
            <i className={`fa-regular fa-angle-${open ? "up" : "down"}`}></i>
          </span>
        </button>
      </div>
      <ProfileDropdown
        open={open}
        anchor={profileBtnRef}
        handleClose={toggleOpen}
      />
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
