import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import AddCard from "./AddCard";
import Card from "./Card";
import DropDown from "./DropDown";
import ListActions from "./ListActions";

const List = ({
  list,
  allLists,
  newCard,
  setNewCard,
  setEditedCard,
  handleAddCard,
  handleAddCancel,
  handleListEdit,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const [editedList, setEditedList] = useState(list);
  const [dropdownMode, setDropdownMode] = useState("default");

  const dropdownTitle = getDropdownTitle();

  function getDropdownTitle() {
    let title = "List Actions";

    switch (dropdownMode) {
      case "sort":
        title = "Sort list";
        break;

      case "move":
        title = "Move all cards in list";
        break;

      case "archive":
        title = "Archive all cards in list";
        break;

      default:
        break;
    }

    return title;
  }

  function handleKeyPress(e) {
    if (e.key === "Escape") {
      setEditedList({ ...list, editing: false });
    }

    if (e.key === "Enter") {
      handleListEdit(editedList);
      setEditedList({ ...editedList, editing: false });
    }
  }

  const handleOutsideClick = (e) => {
    const rect = document
      .getElementById(`name-input-${list.id}`)
      ?.getBoundingClientRect();

    if (
      !(
        e.clientX > rect?.left &&
        e.clientX < rect?.right &&
        e.clientY > rect?.top &&
        e.clientY < rect?.bottom
      )
    ) {
      handleListEdit(editedList);
      setEditedList({ ...editedList, editing: false });
    }
  };

  useEffect(() => {
    function removeEventHandlers() {
      window.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyPress);
    }

    if (editedList.editing) {
      document.getElementById(`name-input-${list.id}`).focus();

      window.addEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      removeEventHandlers();
    }

    return () => removeEventHandlers();
  }, [editedList]);

  return (
    <Draggable draggableId={list.id} index={index} isDragDisabled={open}>
      {(provided, snapshot) => (
        <div
          className={`list ${
            snapshot.isDragging && snapshot.mode === "SNAP" ? "pulse" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header>
            {editedList.editing ? (
              <input
                id={`name-input-${list.id}`}
                className="name"
                value={editedList.name}
                onChange={(e) =>
                  setEditedList({ ...editedList, name: e.target.value })
                }
              />
            ) : (
              <p
                onClick={() => setEditedList({ ...editedList, editing: true })}
                className="name"
              >
                {list.name}
              </p>
            )}
            <div className="action">
              <button className="action_btn" onClick={() => setOpen(!open)}>
                <ion-icon name="ellipsis-horizontal" />
              </button>
              <DropDown
                open={open}
                mode={dropdownMode}
                handleMode={setDropdownMode}
                handleBack={() => setDropdownMode("default")}
                id={`actions_drpdwn-${list.id}`}
                toggleOpen={() => setOpen(!open)}
                title={dropdownTitle}
              >
                <ListActions
                  list={list}
                  allLists={allLists}
                  mode={dropdownMode}
                  handleMode={setDropdownMode}
                  handleClose={() => setOpen(false)}
                  setNewCard={setNewCard}
                />
              </DropDown>
            </div>
          </header>
          <Droppable droppableId={list.id} type={"card"}>
            {(provided, snapshot) => (
              <ul
                style={{ paddingBottom: newCard?.list_id === list.id ? 0 : 40 }}
                className="card_container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, index) =>
                  !card.id.includes("add") ? (
                    <Card
                      key={`card-${card.id}`}
                      card={card}
                      index={index}
                      setEditedCard={setEditedCard}
                    />
                  ) : (
                    <AddCard
                      key={card.id}
                      list={list}
                      newCard={newCard}
                      setNewCard={setNewCard}
                      handleAddCard={handleAddCard}
                      handleAddCancel={handleAddCancel}
                      index={index}
                    />
                  )
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
