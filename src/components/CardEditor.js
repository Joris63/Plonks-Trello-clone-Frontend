import React, { useCallback, useEffect, useState } from "react";
import LabelsDropdown from "./dropdowns/LabelsDropdown";
import MembersDropdown from "./dropdowns/MembersDropdown";
import MoveCardDropdown from "./dropdowns/MoveCardDropdown";

const CardEditor = ({
  editedCard,
  setEditedCard,
  setNewCard,
  handleCardEdit,
}) => {
  const [position, setPosition] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  function ResizeTextArea(e) {
    const textarea = document.getElementById("card-textarea");

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }

  function handleClose(e) {
    const dropDownIsOpen = document.getElementsByClassName("dropdown").length;

    if (
      e.target === document.getElementById("card-editor") &&
      !dropDownIsOpen
    ) {
      setPosition(null);
      setEditedCard(null);
    }
  }

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleCancel();
      }

      if (e.key === "Enter") {
        const targetIsTextarea = e.target.nodeName.toLowerCase() === "textarea";
        const cardContentIsEmpty =
          (typeof editedCard.content === "string" &&
            editedCard.content === "") ||
          !editedCard.content;

        if (e.target.nodeName.toLowerCase() === "button") {
          return;
        }

        if (targetIsTextarea && cardContentIsEmpty) {
          e.preventDefault();
        } else {
          handleCardEdit(editedCard);
          handleCancel();
        }
      }
    },
    [editedCard]
  );

  function removeEventHandlers() {
    document
      .getElementById("card-textarea")
      ?.removeEventListener("keydown", handleKeyPress);
    window.removeEventListener("mousedown", handleClose);
  }

  function handleCancel() {
    setPosition(null);
    setEditedCard(null);
    setOpenDropdown(null);
  }

  useEffect(() => {
    const location = document
      .getElementById(`card-${editedCard?.id}`)
      ?.getBoundingClientRect();

    // To update the state inside the handleKeyPress event handler we need to remove it and add it again
    document
      .getElementById("card-textarea")
      ?.removeEventListener("keydown", handleKeyPress);

    if (location && !position && editedCard?.editor) {
      setPosition({ x: location.left, y: location.top });
    }

    if (editedCard) {
      document
        .getElementById("card-textarea")
        ?.addEventListener("keydown", handleKeyPress);
    }
  }, [editedCard]);

  useEffect(() => {
    if (position) {
      setNewCard(null);
      document
        .getElementById("card-textarea")
        ?.addEventListener("keydown", handleKeyPress);

      window.addEventListener("mousedown", handleClose);

      const textarea = document?.getElementById("card-textarea");

      textarea?.focus();
      textarea?.setSelectionRange(0, textarea.value.length);
    } else {
      removeEventHandlers();
    }

    return () => removeEventHandlers();
  }, [position]);

  if (!position) {
    return null;
  }

  return (
    <div id="card-editor" className="card_editor_overlay">
      <button className="close_card_editor" onClick={() => handleCancel()}>
        <ion-icon name="add-outline" />
      </button>
      <div
        className="card_editor_container"
        style={{ top: position?.y, left: position?.x }}
      >
        <div className="card_wrapper">
          <textarea
            id="card-textarea"
            className="card_editor_form"
            value={editedCard?.content}
            placeholder="Enter a title for this card..."
            onInput={ResizeTextArea}
            onChange={(e) =>
              setEditedCard({ ...editedCard, content: e.target.value })
            }
          />
          <button
            className="save_card_btn text_button"
            onClick={() => {
              handleCardEdit(editedCard);
              handleCancel();
            }}
          >
            Save
          </button>
        </div>
        <div className="card_editor_actions">
          <div>
            <button className="card_editor_action_btn icon_text_button">
              <ion-icon name="card-outline"></ion-icon>
              <p>Open card</p>
            </button>
          </div>
          <div id="edit-label-btn">
            <button
              className="card_editor_action_btn icon_text_button"
              onClick={() => setOpenDropdown("label")}
            >
              <ion-icon name="pricetag-outline"></ion-icon>
              <p>Edit labels</p>
            </button>
          </div>
          <div id="edit-members-btn">
            <button
              className="card_editor_action_btn icon_text_button"
              onClick={() => setOpenDropdown("member")}
            >
              <ion-icon name="person-outline"></ion-icon>
              <p>Change members</p>
            </button>
          </div>
          <div id="move-card-btn">
            <button
              className="card_editor_action_btn icon_text_button"
              onClick={() => setOpenDropdown("move")}
            >
              <ion-icon name="arrow-forward-outline" />
              <p>Move</p>
            </button>
          </div>
          <div>
            <button className="card_editor_action_btn icon_text_button">
              <ion-icon name="archive-outline"></ion-icon>
              <p>Archive</p>
            </button>
          </div>
        </div>
        <LabelsDropdown
          open={openDropdown === "label"}
          handleClose={() => setOpenDropdown(null)}
          anchorId="edit-label-btn"
        />
        <MembersDropdown
          open={openDropdown === "member"}
          handleClose={() => setOpenDropdown(null)}
          anchorId="edit-members-btn"
        />
        <MoveCardDropdown
          open={openDropdown === "move"}
          handleClose={() => setOpenDropdown(null)}
          anchorId="move-card-btn"
        />
      </div>
    </div>
  );
};

export default CardEditor;
