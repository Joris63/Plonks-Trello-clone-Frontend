import React, { useEffect, useLayoutEffect, useState } from "react";
import { getBoard } from "../Board";
import DropDown from "../DropDown";

const LabelsActions = ({ mode, handleMode }) => {
  const [search, setSearch] = useState("");
  const [editedLabel, setEditedLabel] = useState(null);

  const board = getBoard();

  return (
    <div className="actions_list">
      {mode === "default" && (
        <>
          <input
            value={search}
            placeholder="Search labels..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <p className="content_title">Labels</p>
          <ul className="labels_list">
            {board.labels
              .filter((label) =>
                search.toLowerCase().includes(label.name.toLowerCase())
              )
              .map((label) => (
                <li className="label_wrapper" key={`label-${label.color}`}>
                  <button
                    className={`${
                      label.color && `card_label_${label.color}`
                    } label_btn`}
                  >
                    {label.name}
                    <span className="active_label">
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </span>
                  </button>
                  <button
                    className="label_edit_btn"
                    onClick={() => {
                      handleMode("edit");
                      setEditedLabel(label);
                    }}
                  >
                    <ion-icon name="pencil" />
                  </button>
                </li>
              ))}
          </ul>
          <button
            className="dropdown_btn create_new_label_btn"
            onClick={() => {
              handleMode("create");
              setEditedLabel({ color: "green", name: "" });
            }}
          >
            Create a new label
          </button>
        </>
      )}
      {(mode === "edit" || mode === "create") && (
        <>
          <p className="content_title">Name</p>
          <input
            value={editedLabel.name}
            onChange={(e) =>
              setEditedLabel({ ...editedLabel, name: e.target.value })
            }
          />
          <p className="content_title">Select a color</p>
          <div className="label_selector_container">
            <button
              className="label_selector card_label_green"
              onClick={() => setEditedLabel({ ...editedLabel, color: "green" })}
            >
              {editedLabel.color === "green" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_yellow"
              onClick={() =>
                setEditedLabel({ ...editedLabel, color: "yellow" })
              }
            >
              {editedLabel.color === "yellow" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_orange"
              onClick={() =>
                setEditedLabel({ ...editedLabel, color: "orange" })
              }
            >
              {editedLabel.color === "orange" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_red"
              onClick={() => setEditedLabel({ ...editedLabel, color: "red" })}
            >
              {editedLabel.color === "red" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_purple"
              onClick={() =>
                setEditedLabel({ ...editedLabel, color: "purple" })
              }
            >
              {editedLabel.color === "purple" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_blue"
              onClick={() => setEditedLabel({ ...editedLabel, color: "blue" })}
            >
              {editedLabel.color === "blue" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_lightblue"
              onClick={() =>
                setEditedLabel({ ...editedLabel, color: "lightblue" })
              }
            >
              {editedLabel.color === "lightblue" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_lime"
              onClick={() => setEditedLabel({ ...editedLabel, color: "lime" })}
            >
              {editedLabel.color === "lime" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_pink"
              onClick={() => setEditedLabel({ ...editedLabel, color: "pink" })}
            >
              {editedLabel.color === "pink" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <button
              className="label_selector card_label_black"
              onClick={() => setEditedLabel({ ...editedLabel, color: "black" })}
            >
              {editedLabel.color === "black" && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
          </div>
          <div className="no_color_selector">
            <button
              className="label_selector card_label_no_color"
              onClick={() => setEditedLabel({ ...editedLabel, color: null })}
            >
              {!editedLabel.color && (
                <ion-icon name="checkmark-outline"></ion-icon>
              )}
            </button>
            <div className="no_color_info">
              <p className="no_color">No color.</p>
              <p className="no_color_description">
                This won't show up on the front of the cards.
              </p>
            </div>
          </div>
          <div className="label_actions">
            <button className="text_button">
              {mode === "edit" ? "Save" : "Create"}
            </button>
            {mode === "edit" && (
              <button
                className="text_button warning"
                onClick={() => handleMode("delete")}
              >
                Delete
              </button>
            )}
          </div>
        </>
      )}
      {mode === "delete" && (
        <>
          <p>
            There is no undo. This wil remove this label from all cards and
            destroy its history.
          </p>
          <button className="dropdown_btn warning">Delete</button>
        </>
      )}
    </div>
  );
};

const LabelsDropdown = ({ open = true, card, handleClose, anchorId }) => {
  const [position, setPosition] = useState(null);
  const [dropdownMode, setDropdownMode] = useState("default");

  function getDropdownTitle() {
    switch (dropdownMode) {
      case "create":
        return "Create label";

      case "edit":
        return "Change label";

      case "delete":
        return "Delete Label?";

      default:
        return "Labels";
    }
  }

  function getBack() {
    switch (dropdownMode) {
      case "delete":
        return "edit";

      default:
        return "default";
    }
  }

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
      id="labels-drpdwn"
      handleClose={handleClose}
      mode={dropdownMode}
      handleBack={() => setDropdownMode(getBack())}
      title={getDropdownTitle()}
    >
      <LabelsActions mode={dropdownMode} handleMode={setDropdownMode} />
    </DropDown>
  );
};

export default LabelsDropdown;
