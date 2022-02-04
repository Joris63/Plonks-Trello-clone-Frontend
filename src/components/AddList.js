import React from "react";
import { Draggable } from "react-beautiful-dnd";

const AddList = ({ newList, setNewList, index }) => {
  return (
    <Draggable draggableId={"add-list"} index={index}>
      {(provided, snapshot) => (
        <div
          className="add_list_wrapper"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {newList ? (
            <div className="add_list">
              <input
                value={newList?.name}
                placeholder="Enter list title..."
                onChange={(e) =>
                  setNewList({ ...newList, name: e.target.value })
                }
              />
              <div className="buttons">
                <button className="save">Add list</button>
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
          ) : (
            <button className="add_list_btn" onClick={() => setNewList({})}>
              <ion-icon name="add-sharp" />
              <p>Add another list</p>
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default AddList;
