import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";

const DescriptionField = ({ card, handleSave }) => {
  const [editedCard, setEditedCard] = useState(card);
  const [editing, setEditing] = useState(false);

  const cardHasNoDescription =
    editedCard?.description === "" || !editedCard?.description;

  useEffect(() => {
    if (!_.isEqual(card, editedCard)) {
      setEditedCard(card);
    }
  }, [card]);

  function ResizeTextArea(e) {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }

  return (
    <div className="description">
      <div className="title">
        <ion-icon className="icon" name="document-text-outline" />
        <div className="main">
          <p className="name">Description</p>
        </div>
        {!cardHasNoDescription && !editing && (
          <button className="text_button edit" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
      </div>
      <div className="content">
        {cardHasNoDescription && !editing && (
          <button className="add_description" onClick={() => setEditing(true)}>
            <p>Add a more detailed description...</p>
          </button>
        )}
        {editing && (
          <div className="description_form">
            <textarea
              id="description-textarea"
              placeholder="Add a more detailed description..."
              value={editedCard?.description}
              onInput={(e) => ResizeTextArea(e)}
              onChange={(e) =>
                setEditedCard({ ...editedCard, description: e.target.value })
              }
            />
            <div className="actions">
              <button
                className="text_button save"
                onClick={() => {
                  setEditing(false);
                  handleSave(editedCard);
                }}
              >
                Save
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setEditing(false);
                  setEditedCard({
                    ...editedCard,
                    description: card?.description,
                  });
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
