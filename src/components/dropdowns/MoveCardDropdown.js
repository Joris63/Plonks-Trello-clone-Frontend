import React, { useLayoutEffect, useState } from "react";
import DropDown from "../DropDown";

const MoveCardDropdown = ({ open, card, handleClose, anchorId }) => {
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
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
      id="move-card-drpdwn"
      handleClose={handleClose}
      title="Move card"
    >
      <div className="actions_list">
        <p className="content_title">Select destination</p>
        <div className="destination_container">
          <div className="destination_select_wrapper">
            <label className="destination_select_label">List</label>
            <select className="destination_select">
              <option>Concept</option>
            </select>
          </div>
          <div className="destination_select_wrapper">
            <label className="destination_select_label">Position</label>
            <select className="destination_select">
              <option>1</option>
            </select>
          </div>
        </div>
        <button className="text_button move_action_btn">Move</button>
      </div>
    </DropDown>
  );
};

export default MoveCardDropdown;
