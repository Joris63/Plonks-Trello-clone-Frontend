import React, { useState } from "react";
import "../styles/board.scss";
import List from "./List";
import _ from "lodash";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const allLists = [
  {
    id: "0d2b9f81-d438-4421-9c2a-5a71f1cd6419",
    name: "Concept",
    cards: [
      {
        id: "d543a73b-ab6f-4edd-bb36-f6deb1679523",
        content: "Tutorial",
        list_id: "0d2b9f81-d438-4421-9c2a-5a71f1cd6419",
        list_name: "Concept",
        order: 0,
      },
      {
        id: "109826e4-1acf-4fdd-a12d-aa1ccae8fc93",
        content: "Add drag and drop functionality",
        list_id: "0d2b9f81-d438-4421-9c2a-5a71f1cd6419",
        list_name: "Concept",
        order: 1,
      },
      {
        id: "68b0d7ff-8b9b-4d2b-9fa9-107576a05f2e",
        content: "Add create card functionality",
        list_id: "0d2b9f81-d438-4421-9c2a-5a71f1cd6419",
        list_name: "Concept",
        order: 2,
      },
    ],
  },
  {
    id: "dcf60bb3-7c38-4213-bf38-ea6b45116e4a",
    name: "Concept2",
    cards: [
      {
        id: "5b0ec778-22fa-4d3c-887b-8356ed982a80",
        content: "Watch Star Wars",
        list_id: "dcf60bb3-7c38-4213-bf38-ea6b45116e4a",
        list_name: "Concept2",
        order: 0,
      },
      {
        id: "00127536-c4dd-41f8-bf1f-238c2903e768",
        content: "Create a game",
        list_id: "dcf60bb3-7c38-4213-bf38-ea6b45116e4a",
        list_name: "Concept2",
        order: 1,
      },
    ],
  },
];

const Board = (props) => {
  const [lists, setLists] = useState(allLists);

  function findCardById(id, array) {
    let found = null;

    array.forEach((list) => {
      if (!found) {
        found = list.cards.find((card) => card.id === id);
      }
    });

    return found;
  }

  function handleCardSorting(
    draggedCardId,
    destinationParentId,
    destinationIndex
  ) {
    const newLists = _.cloneDeep(lists);
    const draggedCard = findCardById(draggedCardId, newLists);
    const destinationParent = newLists.find(
      (list) => list.id === destinationParentId
    );
    const departureIsDestinationParent =
      draggedCard.list_id === destinationParentId;
    const newChildren = [];
    const actualOrder =
      destinationIndex > draggedCard.order && departureIsDestinationParent
        ? destinationIndex + 1
        : destinationIndex;

    // Remove card from old list
    if (!departureIsDestinationParent) {
      const departureParent = newLists.find(
        (list) => list.id === draggedCard.list_id
      );
      const oldChildren = [];

      _.sortBy(departureParent.cards, ["order"]).forEach((card) => {
        if (card.id !== draggedCardId) {
          card.order = oldChildren.length;
          oldChildren.push(card);
        }
      });

      departureParent.cards = oldChildren;
    }

    // Add card to new list in proper location
    _.sortBy(destinationParent.cards, ["order"]).forEach((card) => {
      if (card.id !== draggedCardId && card.order < actualOrder) {
        card.order = newChildren.length;
        newChildren.push(card);
      }
    });

    draggedCard.list_id = destinationParent.id;
    draggedCard.list_name = destinationParent.name;
    draggedCard.order = destinationIndex;
    newChildren.push(draggedCard);

    _.sortBy(destinationParent.cards, ["order"]).forEach((card) => {
      if (card.id !== draggedCardId && card.order >= actualOrder) {
        card.order = newChildren.length;
        newChildren.push(card);
      }
    });

    destinationParent.cards = newChildren;

    setLists(newLists);
  }

  return (
    <DragDropContext>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            className="board"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lists.map((list, index) => (
              <List key={`list-${list.id}`} list={list} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
