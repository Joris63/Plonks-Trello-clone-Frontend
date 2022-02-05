import React, { useEffect, useState } from "react";

const CardEditor = ({ editedCard, setEditedCard, handleCardEdit }) => {
  const [position, setPosition] = useState(null);

  function ResizeTextArea(e) {
    const textarea = document.getElementById("card-textarea");

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }

  function handleClose(e) {
    if (e.target.id === "card-editor") {
      setPosition(null);
      setEditedCard(null);
    }
  }

  useEffect(() => {
    const location = document
      .getElementById(`card-${editedCard?.id}`)
      ?.getBoundingClientRect();

    if (location && !position) {
      setPosition({ x: location.left, y: location.top });
    }
  }, [editedCard]);

  useEffect(() => {
    if (position) {
      document
        .getElementById("card-editor")
        ?.addEventListener("click", handleClose);

      const textarea = document?.getElementById("card-textarea");

      textarea?.focus();
      textarea?.setSelectionRange(0, textarea.value.length);
    } else {
      document
        .getElementById("card-editor")
        ?.removeEventListener("click", handleClose);
    }

    return () =>
      document
        .getElementById("card-editor")
        ?.removeEventListener("click", handleClose);
  }, [position]);

  if (!position) {
    return null;
  }

  return (
    <div id="card-editor" className="card_editor_overlay">
      <button
        className="cancel"
        onClick={() => {
          setPosition(null);
          setEditedCard(null);
        }}
      >
        <ion-icon name="add-outline" />
      </button>
      <div className="editor" style={{ top: position?.y, left: position?.x }}>
        <div className="card">
          <textarea
            id="card-textarea"
            value={editedCard?.content}
            placeholder="Enter a title for this card..."
            onInput={ResizeTextArea}
            onChange={(e) =>
              setEditedCard({ ...editedCard, content: e.target.value })
            }
          />
          <button
            className="text_button"
            onClick={() => {
              handleCardEdit(editedCard);
              setPosition(null);
              setEditedCard(null);
            }}
          >
            Save
          </button>
        </div>
        <div className="actions">
          <button className="icon_text_button save">
            <ion-icon name="card-outline"></ion-icon>
            <p>Open card</p>
          </button>
          <button className="icon_text_button labels">
            <ion-icon name="pricetag-outline"></ion-icon>
            <p>Edit labels</p>
          </button>
          <button className="icon_text_button members">
            <ion-icon name="person-outline"></ion-icon>
            <p>Change members</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
