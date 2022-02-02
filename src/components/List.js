import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const AddCard = ({ list, handleAddCard }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newCard, setNewCard] = useState(null);

  useEffect(() => {
    const handleDropdown = (e) => {
      const rect = document
        .getElementById(`options_drpdwn-${list.id}`)
        ?.getBoundingClientRect();

      if (
        !(
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        )
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener("click", handleDropdown);
    } else {
      window.removeEventListener("click", handleDropdown);
    }

    return () => window.removeEventListener("click", handleDropdown);
  }, [dropdownOpen, list]);

  function ResizeTextArea(e) {
    const textarea = document.getElementById("add_card_txt_area");

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }

  return (
    <footer>
      {newCard ? (
        <div className="add_card">
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
            <button className="cancel" onClick={() => setNewCard(null)}>
              <ion-icon name="add-outline" />
            </button>
            <div className="options">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <ion-icon name="ellipsis-horizontal" />
              </button>
              {dropdownOpen && (
                <div className="dropdown" id={`options_drpdwn-${list.id}`}>
                  <header>
                    <p className="title">Options</p>
                    <button
                      className="close_btn"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                  </header>
                  <hr />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          className="add_card_btn"
          onClick={() => setNewCard({ list_id: list.id, list_name: list.name })}
        >
          <ion-icon name="add-sharp" />
          <p>Add a card</p>
        </button>
      )}
    </footer>
  );
};

const List = ({ list, handleAddCard, index }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleDropdown = (e) => {
      const rect = document
        .getElementById(`actions_drpdwn-${list.id}`)
        ?.getBoundingClientRect();

      if (
        !(
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        )
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener("click", handleDropdown);
    } else {
      window.removeEventListener("click", handleDropdown);
    }

    return () => window.removeEventListener("click", handleDropdown);
  }, [dropdownOpen, list]);

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <header {...provided.dragHandleProps}>
            <p className="name">{list.name}</p>
            <div className="action">
              <button
                className="action_btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <ion-icon name="ellipsis-horizontal" />
              </button>
              {dropdownOpen && (
                <div className="dropdown" id={`actions_drpdwn-${list.id}`}>
                  <header>
                    <p className="title">List actions</p>
                    <button
                      className="close_btn"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                  </header>
                  <hr />
                </div>
              )}
            </div>
          </header>
          <Droppable droppableId={list.id} type={"card"}>
            {(provided, snapshot) => (
              <ul
                className="card_container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, index) => (
                  <Card key={`card-${card.id}`} card={card} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <AddCard list={list} handleAddCard={handleAddCard} />
        </div>
      )}
    </Draggable>
  );
};

export default List;
