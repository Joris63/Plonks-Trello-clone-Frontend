import React, { useState } from "react";

const ChecklistItem = ({ item, card }) => {
  const [complete, setComplete] = useState(false);
  const [content, setContent] = useState(item?.content || "Ez pz lemon squeezy");
  const [editing, setEditing] = useState(false);

  return (
    <div className="item">
      <label className="check_container">
        <input
          type="checkbox"
          checked={complete}
          onChange={() => setComplete(!complete)}
        />
        <span className="checkmark"></span>
      </label>
      <div
        id={`item-textarea${item ? `-${item.id}` : ""}`}
        className="item_form"
      >
        <textarea
          id="item-textarea"
          placeholder={item ? "" : "Add an item"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="actions">
          <button
            className="text_button save"
            onClick={() => {
              setEditing(false);
            }}
          >
            {item ? "Add" : "Save"}
          </button>
          <button className="cancel" onClick={() => {}}>
            <ion-icon name="add-outline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistItem;
