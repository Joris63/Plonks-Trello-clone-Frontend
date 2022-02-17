import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import AddCardActions from "./AddCardActions";
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

  function handleKeyPress(e) {
    if (e.key === "Escape") {
      setNewCard(null);
    }

    if (e.key === "Enter") {
      const targetIsTextarea = e.target.nodeName.toLowerCase() === "textarea";
      const cardContentIsEmpty =
        (typeof newCard.content === "string" && newCard.content === "") ||
        !newCard.content;

      if ((targetIsTextarea && cardContentIsEmpty) || cardContentIsEmpty) {
        e.preventDefault();
      } else {
        handleAddCard();
      }
    }
  }

  function removeEventHandlers() {
    document.removeEventListener("keydown", handleKeyPress);
    document
      .getElementById(`add-card-txt-${list.id}`)
      ?.removeEventListener("keydown", handleKeyPress);
  }

  useEffect(() => {
    if (newCard?.list_id === list.id) {
      const textarea = document.getElementById(`add-card-txt-${list.id}`);

      textarea.focus();
      textarea.addEventListener("keydown", handleKeyPress);

      document.addEventListener("keydown", handleKeyPress);
    } else {
      removeEventHandlers();
    }

    return () => removeEventHandlers();
  }, [newCard]);

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
          className={`add_card ${snapshot.isDragging ? "" : "withPadding"} ${
            snapshot.isDragging && snapshot.mode === "SNAP" ? "pulse" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, height: height + 48 }}
        >
          <textarea
            id={`add-card-txt-${list.id}`}
            style={
              snapshot.isDragging
                ? { height: height + 32 }
                : { height: height - 16 }
            }
            value={newCard?.content}
            placeholder="Enter a title for this card..."
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
              className="text_button save"
              onClick={() => {
                if (newCard.content && newCard.content !== "") {
                  handleAddCard();
                }
              }}
            >
              Add card
            </button>
            <div className="cancel">
              <button
                onClick={() => {
                  handleAddCancel(list.id);
                }}
              >
                <ion-icon name="add-outline" />
              </button>
            </div>
            <div className="options">
              <button className="option_btn" onClick={() => setOpen(!open)}>
                <ion-icon name="ellipsis-horizontal" />
              </button>
              <DropDown
                title="Options"
                open={open}
                id={`options_drpdwn-${list.id}`}
                toggleOpen={() => setOpen(!open)}
              >
                <AddCardActions />
              </DropDown>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  ) : (
    <li className="add_card_btn">
      <button
        className="icon_text_button"
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
