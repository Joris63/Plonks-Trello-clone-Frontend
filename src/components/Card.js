import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <li
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="content">{card.content}</p>
        </li>
      )}
    </Draggable>
  );
};

export default Card;
