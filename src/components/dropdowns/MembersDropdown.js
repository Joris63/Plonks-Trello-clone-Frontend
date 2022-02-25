import React, { useEffect, useState } from "react";
import DropDown from "../DropDown";

const MembersDropdown = ({ open = true, card, handleClose, anchorId }) => {
  const [position, setPosition] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const location = document
      .getElementById(anchorId)
      ?.getBoundingClientRect() || { left: 0, top: 0 };

    if (location) {
      setPosition({ x: location.left, y: location.top + 45 });
    }

    if (!open) {
      setPosition(null);
    }
  }, [open]);

  return (
    <DropDown
      open={open}
      position={position}
      id="members-drpdwn"
      handleClose={handleClose}
      title="Members"
    >
      <div className="actions_list">
        <input
          value={search}
          placeholder="Search members..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="content_title">Board members</p>
        <ul className="board_members_list">
          <li className="board_member_wrapper">
            <button className="dropdown_btn board_member">
              <img
                src="https://i.pinimg.com/originals/2f/fa/e6/2ffae67cccf7d31c352649d8a3d0810c.jpg"
                alt="Profile"
              />
              <p className="board_member_name">JorisK (jorisk63)</p>
              <ion-icon name="checkmark-outline"></ion-icon>
            </button>
          </li>
        </ul>
      </div>
    </DropDown>
  );
};

export default MembersDropdown;
