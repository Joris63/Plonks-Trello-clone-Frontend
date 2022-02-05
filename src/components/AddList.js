import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

const AddList = ({ newList, setNewList, handleAddList, index }) => {
  function handleKeyPress(e) {
    if (e.key === "Escape") {
      setNewList(null);
    }

    if (
      e.key === "Enter" &&
      typeof newList?.name === "string" &&
      newList?.name !== ""
    ) {
      handleAddList();
    }
  }

  function removeEventHandlers() {
    document.removeEventListener("keydown", handleKeyPress);
  }

  useEffect(() => {
    if (newList) {
      document.getElementById(`add-list-input`).focus();

      document.addEventListener("keydown", handleKeyPress);
    } else {
      removeEventHandlers();
    }

    return () => removeEventHandlers();
  }, [newList]);

  return newList ? (
    <Draggable draggableId={"add-list"} index={index}>
      {(provided, snapshot) => (
        <div
          className="add_list_wrapper"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="add_list">
            <input
              id="add-list-input"
              value={newList?.name || ""}
              placeholder="Enter list title..."
              onChange={(e) => setNewList({ ...newList, name: e.target.value })}
            />
            <div className="buttons">
              <button className="save" onClick={() => handleAddList()}>
                Add list
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setNewList(null);
                }}
              >
                <ion-icon name="add-outline" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  ) : (
    <button
      style={{ transform: `translate(${index * 282}px, 0)` }}
      className="add_list_btn"
      onClick={() => setNewList({})}
    >
      <ion-icon name="add-sharp" />
      <p>Add another list</p>
    </button>
  );
};

export default AddList;
