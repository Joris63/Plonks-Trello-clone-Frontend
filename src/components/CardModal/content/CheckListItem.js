import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChecklistItem = ({
  item,
  onSave,
  onCancel = () => {},
}) => {
  const [editing, setEditing] = useState(item ? false : true);
  const [editedItem, setEditedItem] = useState(item);
  const [height, setHeight] = useState(75);

  function ResizeTextArea(e) {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setHeight(textarea.scrollHeight);
  }

  const handleItemForm = (e) => {
    const commentForm = document.getElementById(
      `item-form${item ? `-${item.id}` : ""}`
    );
    const textarea = document.getElementById(
      `item-textarea${item ? `-${item.id}` : ""}`
    );
    const status =
      commentForm?.contains(document.activeElement) ||
      textarea === document.activeElement ||
      (commentForm?.contains(e.target) && e.type === "click");

    setEditing(status);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (editing?.content !== "") {
        document
          .getElementById(`item-textarea${item ? `-${item.id}` : ""}`)
          .blur();
        handleSave();
      } else {
        e.preventDefault();
      }
    }
  };

  const handleSave = () => {
    const updatedItem = {
      id: uuidv4(),
      complete: false,
      ...editedItem,
    };

    onSave(updatedItem);
  };

  useEffect(() => {
    document.removeEventListener("click", handleItemForm);

    if (editing) {
      document.addEventListener("click", handleItemForm);
    }

    return () => {
      document.removeEventListener("click", handleItemForm);
    };
  }, [editing]);

  return (
    <div className="checklist_item">
      <label className="check_container">
        {item && (
          <>
            <input
              type="checkbox"
              checked={editedItem.complete}
              onChange={() =>
                setEditedItem({ ...editedItem, complete: !editedItem.complete })
              }
            />
            <span
              className={`checkmark animate__animated animate__slower ${
                editedItem.complete ? "animate__tada" : ""
              }`}
            />
          </>
        )}
      </label>
      <div id={`checklist_item-form${item ? `-${item.id}` : ""}`} className="checklist_item_form">
        <textarea
          disabled={item && !editing}
          id={`item-textarea${item ? `-${item.id}` : ""}`}
          placeholder={item ? "" : "Add an item"}
          value={editedItem?.content || ""}
          style={{ height: !editing ? 20 : height - 16 }}
          onChange={(e) =>
            setEditedItem({ ...editedItem, content: e.target.value })
          }
          onInput={ResizeTextArea}
          onKeyDown={handleKeyPress}
          onFocus={handleItemForm}
        />
        {editing && (
          <div className="checklist_item_form_actions">
            <div className="actions_left">
              <button
                className="text_button save_checklist_item_btn"
                onClick={() => {
                  setEditing(false);
                  handleSave();
                }}
              >
                {item ? "Add" : "Save"}
              </button>
              <button
                className="cancel_checklist_item_btn"
                onClick={() => {
                  if (item) {
                    setEditing(false);
                  } else {
                    onCancel();
                  }
                }}
              >
                <ion-icon name="add-outline" />
              </button>
            </div>
            <div className="actions_right">
              <button className="checklist_item_option">
                <ion-icon name="at-outline" />
              </button>
              <button className="option">
                <ion-icon name="happy-outline" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
