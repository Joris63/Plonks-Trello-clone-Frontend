import _ from "lodash";
import React, { useEffect, useState } from "react";

const DescriptionField = ({ card, handleSave }) => {
  const [editedCard, setEditedCard] = useState(card);
  const [editing, setEditing] = useState(false);

  const cardHasNoDescription =
    editedCard?.description === "" || !editedCard?.description;

  const handleCancel = () => {
    setEditing(false);
    setEditedCard({
      ...editedCard,
      description: card?.description,
    });
  };

  function ResizeTextArea(e) {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }

  function handleClose(e) {
    const descriptionForm = document.getElementById("description-form");

    if (!descriptionForm?.contains(e.target) && editing) {
      handleCancel();
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }

    if (e.key === "Enter") {
      const cardDescriptionIsEmpty =
        (typeof editedCard.description === "string" &&
          editedCard.description === "") ||
        !editedCard.description;

      if (!cardDescriptionIsEmpty && !e.shiftKey) {
        handleSave(editedCard);
        setEditing(false);
      }
    }
  };

  useEffect(() => {
    if (!_.isEqual(card, editedCard)) {
      setEditedCard(card);
    }
  }, [card]);

  useEffect(() => {
    if (editing) {
      document.getElementById("description-textarea")?.focus();
      document.addEventListener("click", handleClose);
    } else {
      document.removeEventListener("click", handleClose);
    }

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [editing]);

  return (
    <div className="description">
      <div className="card_detail_title_wrapper">
        <ion-icon className="icon" name="document-text-outline" />
        <div className="card_detail_title">
          <p className="detail_title">Description</p>
        </div>
        {!cardHasNoDescription && !editing && (
          <button
            className="text_button detail_title_action"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="card_detail_content">
        {cardHasNoDescription && !editing && (
          <button className="add_description" onClick={() => setEditing(true)}>
            <p>Add a more detailed description...</p>
          </button>
        )}
        {editing && (
          <div id="description-form" className="description_form">
            <textarea
              id="description-textarea"
              placeholder="Add a more detailed description..."
              value={editedCard?.description}
              onInput={ResizeTextArea}
              onKeyDown={handleKeyPress}
              onChange={(e) =>
                setEditedCard({ ...editedCard, description: e.target.value })
              }
            />
            <div className="description_form_actions">
              <button
                className="text_button save_description_btn"
                onClick={() => {
                  setEditing(false);
                  handleSave(editedCard);
                }}
              >
                Save
              </button>
              <button
                className="cancel_description_btn"
                onClick={() => {
                  handleCancel();
                }}
              >
                <ion-icon name="add-outline" />
              </button>
            </div>
          </div>
        )}
        {!editing && !cardHasNoDescription && (
          <p className="description_container" onClick={() => setEditing(true)}>
            {editedCard?.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default DescriptionField;
