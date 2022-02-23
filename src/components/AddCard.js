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
          className={`add_card_wrapper ${
            snapshot.isDragging ? "" : "withPadding"
          } ${snapshot.isDragging && snapshot.mode === "SNAP" ? "pulse" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, height: height + 48 }}
        >
          <textarea
            id={`add-card-txt-${list.id}`}
            className="add_card_form"
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
            className="add_card_actions"
            style={{ opacity: snapshot.isDragging ? 0 : 1, transitionDelay: 0 }}
          >
            <button
              className="text_button add_card_btn"
              onClick={() => {
                if (newCard.content && newCard.content !== "") {
                  handleAddCard();
                }
              }}
            >
              Add card
            </button>
            <div className="cancel_card_btn">
              <button
                onClick={() => {
                  handleAddCancel(list.id);
                }}
              >
                <ion-icon name="add-outline" />
              </button>
            </div>
            <div className="add_card_options">
              <button className="add_card_option_btn" onClick={() => setOpen(!open)}>
                <ion-icon name="ellipsis-horizontal" />
              </button>
              <DropDown
                title="Options"
                open={open}
                id={`options_drpdwn-${list.id}`}
                handleClose={() => setOpen(false)}
              >
                <AddCardActions />
              </DropDown>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  ) : (
    <li className="open_add_card_wrapper">
      <button
        className="open_add_card_btn icon_text_button"
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
