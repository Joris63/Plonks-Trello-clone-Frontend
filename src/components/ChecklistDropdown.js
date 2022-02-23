import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { v4 as uuidv4 } from "uuid";

const ChecklistDropdown = ({ open = true, handleClose, anchorId }) => {
  const [position, setPosition] = useState(null);
  const [checklist, setChecklist] = useState({
    id: uuidv4(),
    name: "Checklist",
    items: [],
  });

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
      id="checklist-drpdwn"
      handleClose={handleClose}
      title="Add checklist"
    >
      <div className="actions_list">
        <p className="content_title">Title</p>
        <input
          value={checklist.name}
          onChange={(e) => setChecklist({ ...checklist, name: e.target.value })}
        />
        <button className="save text_button">Add</button>
      </div>
    </DropDown>
  );
};

export default ChecklistDropdown;
