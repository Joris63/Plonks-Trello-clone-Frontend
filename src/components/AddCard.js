import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import DropDown from "./DropDown";

const AddCard = ({
  list,
  index,
  newCard,
  setNewCard,
  handleAddCard,
  handleAddCancel,
}) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(85);

  function ResizeTextArea(e) {
    const textarea = document.getElementById(`add-card-txt-${list.id}`);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;

    setHeight(textarea.scrollHeight);
  }

  return newCard?.list_id === list.id ? (
    <Draggable draggableId={`add-card-${list.id}`} index={index}>
      {(provided, snapshot) => (
        <li
          className={`add_card`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <textarea
            id={`add-card-txt-${list.id}`}
            style={
              snapshot.isDragging
                ? {
                    height: height + 34,
                    marginBottom: 0,
                  }
                : { height: height - 16, marginBottom: 40 }
            }
            value={newCard?.content}
            placeholder="Enter a tile for this card..."
            onInput={ResizeTextArea}
            onChange={(e) =>
              setNewCard({ ...newCard, content: e.target.value })
            }
          />
          <div
            className="buttons"
            style={{ opacity: snapshot.isDragging ? 0 : 1, transitionDelay: 0 }}
          >
            <button
              className="save"
              onClick={() => {
                handleAddCard(newCard, list.id);
                setNewCard(null);
              }}
            >
              Add card
            </button>
            <div className="cancel">
              <button
                onClick={() => {
                  setNewCard(null);
                  handleAddCancel(list.id);
                }}
              >
                <ion-icon name="add-outline" />
              </button>
            </div>
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
    <li className="add_card_btn">
      <button
        onClick={() =>
          setNewCard({ ...newCard, list_id: list.id, list_name: list.name })
        }
      >
        <ion-icon name="add-sharp" />
        <p>Add a card</p>
      </button>
    </li>
  );
};

export default AddCard;
