import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import DropDown from "./DropDown";

const AddCard = ({ list, index, handleAddCard, handleAddCancel }) => {
  const [open, setOpen] = useState(false);
  const [newCard, setNewCard] = useState(null);

  function ResizeTextArea(e) {
    const textarea = document.getElementById("add_card_txt_area");

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }

  return newCard ? (
    <Draggable draggableId={`add-card-${list.id}`} index={index}>
      {(provided, snapshot) => (
        <li
          className={`add_card`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <textarea
            id="add_card_txt_area"
            placeholder="Enter a tile for this card..."
            onInput={ResizeTextArea}
            onChange={(e) =>
              setNewCard({ ...newCard, content: e.target.value })
            }
          />
          <div className="buttons">
            <button
              className="save"
              onClick={() => {
                handleAddCard(newCard, list.id);
                setNewCard(null);
              }}
            >
              Add card
            </button>
            <button
              className="cancel"
              onClick={() => {
                setNewCard(null);
                handleAddCancel(list.id);
              }}
            >
              <ion-icon name="add-outline" />
            </button>
            <div className="options">
              <button onClick={() => setOpen(!open)}>
                <ion-icon name="ellipsis-horizontal" />
              </button>
              <DropDown
                open={open}
                id={`options_drpdwn-${list.id}`}
                handleClose={() => setOpen(false)}
              >
                <header>
                  <p className="title">Options</p>
                  <button className="close_btn" onClick={() => setOpen(!open)}>
                    <ion-icon name="add-outline"></ion-icon>
                  </button>
                </header>
                <hr />
              </DropDown>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  ) : (
    <li>
      <button
        className="add_card_btn"
        onClick={() => setNewCard({ list_id: list.id, list_name: list.name })}
      >
        <ion-icon name="add-sharp" />
        <p>Add a card</p>
      </button>
    </li>
  );
};

export default AddCard;
