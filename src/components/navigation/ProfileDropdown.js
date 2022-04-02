import { Link, useNavigate } from "react-router-dom";
import { FireToast } from "../../utils/helpers/toasts.helpers";
import Dropdown from "../helpers/Dropdown";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const ProfileDropdown = ({ open, anchor, handleClose }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  async function handleLogout() {
    await axiosPrivate
      .post("/auth/revoke-token", { userId: auth?.user?.id })
      .then((response) => {
        handleClose();
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else {
          FireToast("Something went wrong.", "error");
        }
      });
  }

  return (
    <Dropdown open={open} anchor={anchor} handleClose={handleClose}>
      <ul className="dropdown_actions_list">
        <li className="dropdown_action_wrapper">
          <Link
            className="dropdown_action"
            to="/settings"
            onClick={handleClose}
          >
            <i className="dropdown_action_icon fa-solid fa-gear"></i>
            Settings
          </Link>
        </li>
        <li className="dropdown_action_wrapper">
          <button
            className="dropdown_action"
            to="/login"
            onClick={handleLogout}
          >
            <i className="dropdown_action_icon fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default ProfileDropdown;
