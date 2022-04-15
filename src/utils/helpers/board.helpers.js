import _ from "lodash";

function UpdateItemOrders(array) {
  array.forEach((item) => {
    item.order = array.indexOf(item);
  });
}

function FindById(id, array) {
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

function SortCards(
  board,
  draggedCardId,
  destinationParentId,
  destinationIndex
) {
  const newLists = _.cloneDeep(board?.lists);
  const draggedCard = FindById(draggedCardId, newLists);
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

  return { ...board, lists: newLists };
}

function SortLists(board, draggedListId, destinationIndex) {
  const newLists = _.cloneDeep(board?.lists);
  const draggedList = FindById(draggedListId, newLists);

  // Remove card from old list
  newLists.splice(draggedList.order, 1);

  UpdateItemOrders(newLists);

  // Add card to new list in proper location
  draggedList.list_id = draggedList.id;
  draggedList.list_name = draggedList.name;

  newLists.splice(destinationIndex, 0, draggedList);

  UpdateItemOrders(newLists);

  return { ...board, lists: newLists };
}

export { UpdateItemOrders, FindById, SortCards, SortLists };
