import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index, setEditedCard }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <li
          id={`card-${card.id}`}
          className={`card ${
            snapshot.isDragging && snapshot.mode === "SNAP" ? "pulse" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setEditedCard({ ...card, editor: false, modal: true })}
        >
          <p className="content">{card.content}</p>
          <button
            className="edit"
            onClick={(e) => {
              e.preventDefault();
              setEditedCard({ ...card, editor: true, modal: false });
            }}
          >
            <ion-icon name="pencil-sharp"></ion-icon>
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default Card;
