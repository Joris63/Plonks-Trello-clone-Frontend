import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const List = ({ list, index }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleDropdown = (e) => {
      const rect = document
        .getElementById(`action_drpdwn-${list.id}`)
        ?.getBoundingClientRect();

      if (
        !(
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        )
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("click", handleDropdown);
    } else {
      window.removeEventListener("click", handleDropdown);
    }

    return () => window.removeEventListener("click", handleDropdown);
  }, [open, list]);

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
              <button className="action_btn" onClick={() => setOpen(!open)}>
                <ion-icon name="ellipsis-horizontal" />
              </button>
              {open && (
                <div
                  className="action_dropdown"
                  id={`action_drpdwn-${list.id}`}
                >
                  <header>
                    <p className="title">List actions</p>
                    <button
                      className="close_btn"
                      onClick={() => setOpen(!open)}
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
          <footer>
            <button className="add_card">
              <ion-icon name="add-sharp" />
              <p>Add a card</p>
            </button>
          </footer>
        </div>
      )}
    </Draggable>
  );
};

export default List;
