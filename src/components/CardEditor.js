import React, { useCallback, useEffect, useState } from "react";

const CardEditor = ({
  editedCard,
  setEditedCard,
  setNewCard,
  handleCardEdit,
}) => {
  const [position, setPosition] = useState(null);

  function ResizeTextArea(e) {
    const textarea = document.getElementById("card-textarea");

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }

  function handleClose(e) {
    const node = e.target.nodeName.toLowerCase();
    if (
      node !== "button" &&
      !e.path.some((node) => node.nodeName?.toLowerCase() === "button") &&
      node !== "textarea"
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
    document
      .getElementById("card-editor")
      ?.removeEventListener("click", handleClose);
  }

  function handleCancel() {
    setPosition(null);
    setEditedCard(null);
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

      document
        .getElementById("card-editor")
        ?.addEventListener("click", handleClose);

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
          <button className="card_editor_action_btn icon_text_button">
            <ion-icon name="card-outline"></ion-icon>
            <p>Open card</p>
          </button>
          <button className="card_editor_action_btn icon_text_button">
            <ion-icon name="pricetag-outline"></ion-icon>
            <p>Edit labels</p>
          </button>
          <button className="card_editor_action_btn icon_text_button">
            <ion-icon name="person-outline"></ion-icon>
            <p>Change members</p>
          </button>
          <button className="card_editor_action_btn icon_text_button">
            <ion-icon name="arrow-forward-outline" />
            <p>Move</p>
          </button>
          <button className="card_editor_action_btn icon_text_button">
            <ion-icon name="archive-outline"></ion-icon>
            <p>Archive</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
