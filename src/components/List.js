import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import AddCard from "./AddCard";
import Card from "./Card";
import DropDown from "./DropDown";

const List = ({
  list,
  newCard,
  setNewCard,
  handleAddCard,
  handleAddCancel,
  handleListEdit,
  handleCardEdit,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const [editedList, setEditedList] = useState(list);

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
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="list"
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
                id={`actions_drpdwn-${list.id}`}
                handleClose={() => setOpen(false)}
              >
                <header>
                  <p className="title">List actions</p>
                  <button className="close_btn" onClick={() => setOpen(!open)}>
                    <ion-icon name="add-outline"></ion-icon>
                  </button>
                </header>
                <hr />
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
                  !card.id.includes("add-card") ? (
                    <Card key={`card-${card.id}`} card={card} index={index} />
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
