import React from "react";

const ListActions = ({ list, handleClose, setNewCard }) => {
  return (
    <div className="actions_list">
      <button
        onClick={() => {
          handleClose();
          setNewCard({ list_id: list.id, list_name: list.name });
        }}
      >
        Add a card...
      </button>
      <hr />
      <button>Sort by...</button>
      <hr />
      <button>Move all cards in this list...</button>
      <button>Archive all cards in this list...</button>
      <hr />
      <button>Archive this list</button>
    </div>
  );
};

export default ListActions;
