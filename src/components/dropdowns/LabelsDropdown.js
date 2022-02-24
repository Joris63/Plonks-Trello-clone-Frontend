import React, { useEffect, useState } from "react";
import DropDown from "../DropDown";

const LabelsDropdown = ({ open = true, card, handleClose, anchorId }) => {
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
      id="labels-drpdwn"
      handleClose={handleClose}
      title="Labels"
    >
      <div className="actions_list">
        <input
          value={search}
          placeholder="Search labels..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="content_title">Labels</p>
        <ul className="labels_list">
          <li className="label_wrapper">
            <button className="card_label_green label_btn">Yes</button>
            <button className="label_edit_btn">
              <ion-icon name="pencil" />
            </button>
          </li>
          <li className="label_wrapper">
            <button className="card_label_yellow label_btn">Yes</button>
            <button className="label_edit_btn">
              <ion-icon name="pencil" />
            </button>
          </li>
          <li className="label_wrapper">
            <button className="card_label_orange label_btn">Yes</button>
            <button className="label_edit_btn">
              <ion-icon name="pencil" />
            </button>
          </li>
          <li className="label_wrapper">
            <button className="card_label_red label_btn">Yes</button>
            <button className="label_edit_btn">
              <ion-icon name="pencil" />
            </button>
          </li>
          <li className="label_wrapper">
            <button className="card_label_purple label_btn">Yes</button>
            <button className="label_edit_btn">
              <ion-icon name="pencil" />
            </button>
          </li>
          <li className="label_wrapper">
            <button className="card_label_blue label_btn">Yes</button>
            <button className="label_edit_btn">
              <ion-icon name="pencil" />
            </button>
          </li>
        </ul>
        <button className="create_new_label">Create a new label</button>
      </div>
    </DropDown>
  );
};

export default LabelsDropdown;
