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
    order: 0,
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
    order: 1,
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

function UpdateItemOrders(array) {
  array.forEach((item) => {
    item.order = array.indexOf(item);
  });
}

function findById(id, array) {
  let found = null;

  found = array.find((list) => list.id === id);

  if (!found) {
    array.forEach((list) => {
      if (!found) {
        found = list.cards.find((card) => card.id === id);
      }
    });
  }
  return found;
}

const Board = (props) => {
  const [lists, setLists] = useState(allLists);
  function onDragEnd(result) {
    const { draggableId, destination, type } = result;

    switch (type) {
      case "card":
        sortCards(draggableId, destination.droppableId, destination.index);
        break;
      case "list":
        sortLists(draggableId, destination.index);
        break;
      default:
        break;
    }
  }

  function sortCards(draggedCardId, destinationParentId, destinationIndex) {
    const newLists = _.cloneDeep(lists);
    const draggedCard = findById(draggedCardId, newLists);
    const destinationParent = newLists.find(
      (list) => list.id === destinationParentId
    );
    const departureParent = newLists.find(
      (list) => list.id === draggedCard.list_id
    );

    // Remove card from old list
    departureParent.cards.splice(draggedCard.order, 1);

    UpdateItemOrders(departureParent.cards);

    // Add card to new list in proper location
    draggedCard.list_id = destinationParent.id;
    draggedCard.list_name = destinationParent.name;

    destinationParent.cards.splice(destinationIndex, 0, draggedCard);

    UpdateItemOrders(destinationParent.cards);

    setLists(newLists);
  }

  function sortLists(draggedListId, destinationIndex) {
    const newLists = [];
    const draggedList = findById(draggedListId, lists);
    const actualOrder =
      destinationIndex > draggedList.order
        ? destinationIndex + 1
        : destinationIndex;

    _.sortBy(lists, ["order"]).forEach((list) => {
      if (list.id !== draggedListId && list.order < actualOrder) {
        newLists.push({ ...list, order: newLists.length });
      }
    });

    draggedList.order = newLists.length;
    newLists.push(draggedList);

    _.sortBy(lists, ["order"]).forEach((list) => {
      if (list.id !== draggedListId && list.order >= actualOrder) {
        newLists.push({ ...list, order: newLists.length });
      }
    });

    setLists(newLists);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
