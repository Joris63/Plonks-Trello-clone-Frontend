import "../../styles/navigation.scss";

const RightNavbar = (props) => {
  return (
    <div className="navbar_right">
      <button className="navbar_icon_btn badge">
        <i class="fa-regular fa-bell"></i>
      </button>
      <button className="navbar_profile_btn">Joris Kamminga</button>
    </div>
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
