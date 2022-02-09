import React, { useEffect, useState } from "react";
import "../styles/board.scss";
import "../styles/common.scss";
import List from "./List";
import _ from "lodash";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import AddList from "./AddList";
import CardEditor from "./CardEditor";

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
        createdAt: 1644313051214,
      },
      {
        id: "109826e4-1acf-4fdd-a12d-aa1ccae8fc93",
        content: "Add drag and drop functionality",
        list_id: "0d2b9f81-d438-4421-9c2a-5a71f1cd6419",
        list_name: "Concept",
        order: 1,
        createdAt: 1644313051214,
      },
      {
        id: "68b0d7ff-8b9b-4d2b-9fa9-107576a05f2e",
        content: "Add create card functionality",
        list_id: "0d2b9f81-d438-4421-9c2a-5a71f1cd6419",
        list_name: "Concept",
        order: 2,
        createdAt: 1644313051214,
      },
    ],
    createdAt: 1644313051214,
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
        createdAt: 1644313051214,
      },
      {
        id: "00127536-c4dd-41f8-bf1f-238c2903e768",
        content: "Create a game",
        list_id: "dcf60bb3-7c38-4213-bf38-ea6b45116e4a",
        list_name: "Concept2",
        order: 1,
        createdAt: 1644313051214,
      },
    ],
    createdAt: 1644313051214,
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
        found =
          list.cards.find((card) => card.id === id) ||
          list.cards.find((card) => card.id === id);
      }
    });
  }
  return found;
}

const Board = (props) => {
  const [lists, setLists] = useState(allLists);
  const [newCard, setNewCard] = useState(null);
  const [newList, setNewList] = useState(null);
  const [editedCard, setEditedCard] = useState(null);

  useEffect(() => {
    const updatedLists = _.cloneDeep(lists);

    updatedLists.forEach((list) => {
      if (!findById(`add-card-${list.id}`, updatedLists)) {
        list.cards.push({
          id: `add-card-${list.id}`,
          list_id: list.id,
          list_name: list.name,
          order: list.cards.length,
        });
      }
    });

    if (!findById("add-list", updatedLists)) {
      updatedLists.push({
        id: `add-list`,
        order: updatedLists.length,
      });
    }

    setLists(updatedLists);
  }, []);

  function onDragEnd(result) {
    const { draggableId, destination, type } = result;

    if (!destination) {
      return;
    }

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

    if (
      draggedCardId.includes("add-card") &&
      destinationParentId !== departureParent.id
    ) {
      setNewCard({
        ...newCard,
        list_id: destinationParent.id,
        list_name: destinationParent.name,
      });

      // Remove card from old list
      const card = destinationParent.cards.pop();

      // Add card to new list in proper location
      destinationParent.cards.splice(destinationIndex, 0, card);

      UpdateItemOrders(destinationParent.cards);
    } else {
      // Remove card from old list
      departureParent.cards.splice(draggedCard.order, 1);

      UpdateItemOrders(departureParent.cards);

      // Add card to new list in proper location
      draggedCard.list_id = destinationParent.id;
      draggedCard.list_name = destinationParent.name;

      destinationParent.cards.splice(destinationIndex, 0, draggedCard);

      UpdateItemOrders(destinationParent.cards);
    }

    setLists(newLists);
  }

  function sortLists(draggedListId, destinationIndex) {
    const newLists = _.cloneDeep(lists);
    const draggedList = findById(draggedListId, lists);

    // Remove card from old list
    newLists.splice(draggedList.order, 1);

    UpdateItemOrders(newLists);

    // Add card to new list in proper location
    draggedList.list_id = draggedList.id;
    draggedList.list_name = draggedList.name;

    newLists.splice(destinationIndex, 0, draggedList);

    UpdateItemOrders(newLists);

    setLists(newLists);
  }

  function handleAddCard() {
    const newLists = _.cloneDeep(lists);
    const parentList = findById(newCard.list_id, newLists);
    const addCard = findById(`add-card-${newCard.list_id}`, newLists);
    const date = new Date();

    // Replace add card section with the new card
    parentList.cards.splice(addCard.order, 1, {
      id: uuidv4(),
      ...newCard,
    });

    // Add the add card section again
    parentList.cards.push({
      id: `add-card-${parentList.id}`,
      list_id: parentList.id,
      list_name: parentList.name,
      order: parentList.cards.length,
      createdAt: date.getTime(),
    });

    UpdateItemOrders(parentList.cards);

    setLists(newLists);
    setNewCard(null);
  }

  function handleAddCancel(listId) {
    const updatedLists = _.cloneDeep(lists);
    const list = findById(listId, updatedLists);
    const addCard = findById(`add-card-${list.id}`, updatedLists);
    const newCards = [];

    _.sortBy(list.cards, ["order"]).forEach((card) => {
      if (!card.id.includes("add-card")) {
        newCards.push({ ...card, order: newCards.length });
      }
    });

    addCard.order = newCards.length;
    newCards.push(addCard);

    list.cards = newCards;

    setLists(updatedLists);
    setNewCard(null);
  }

  function handleCardEdit(updatedCard) {
    console.log(editedCard);
    const newLists = _.cloneDeep(lists);
    const card = findById(updatedCard.id, newLists);
    const parentList = findById(card.list_id, newLists);

    parentList.cards.splice(card.order, 1, { ...updatedCard });

    setLists(newLists);
  }

  function handleCardArchive(cardId) {}

  function handleAddList() {
    const newLists = _.cloneDeep(lists);
    const addList = findById("add-list", newLists);
    const date = new Date();

    const id = uuidv4();

    // Replace add list section with the new list
    newLists.splice(addList.order, 1, {
      id,
      ...newList,
      cards: [
        {
          id: `add-card-${id}`,
          list_id: id,
          list_name: newList.name,
          order: 0,
          createdAt: date.getTime(),
        },
      ],
    });

    // Add the add list section again
    newLists.push(addList);

    UpdateItemOrders(newLists);

    setLists(newLists);
    setNewList(null);
  }

  function handleListEdit(updatedlist) {
    const newLists = _.cloneDeep(lists);
    const list = findById(updatedlist.id, newLists);

    newLists.splice(list.order, 1, { ...updatedlist, cards: list.cards });

    setLists(newLists);
  }

  function handleListArchive(listId) {}

  function sortCardsBy(listId, type) {}

  function moveAllCards(departureParentId, destinationParentId) {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div
            className="board"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lists.map((list, index) =>
              !list.id.includes("add") ? (
                <List
                  key={`list-${list.id}`}
                  list={list}
                  allLists={lists}
                  index={index}
                  newCard={newCard}
                  setNewCard={setNewCard}
                  setEditedCard={setEditedCard}
                  handleAddCard={handleAddCard}
                  handleAddCancel={handleAddCancel}
                  handleListEdit={handleListEdit}
                  handleCardEdit={handleCardEdit}
                />
              ) : (
                <AddList
                  key="add-list"
                  newList={newList}
                  setNewList={setNewList}
                  handleAddList={handleAddList}
                  index={index}
                />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CardEditor
        setNewCard={setNewCard}
        editedCard={editedCard}
        setEditedCard={setEditedCard}
        handleCardEdit={handleCardEdit}
      />
    </DragDropContext>
  );
};

export default Board;
