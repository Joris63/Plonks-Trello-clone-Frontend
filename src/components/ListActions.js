import React from "react";

const ListActions = ({
  list,
  allLists = [],
  mode,
  handleMode,
  handleClose,
  setNewCard,
  handleSort,
  handleMoveAllCards,
  handleArchiveAllCards,
  handleArchive,
}) => {
  return (
    <div className="actions_list">
      {mode === "default" && (
        <>
          <button
            onClick={() => {
              handleClose();
              setNewCard({ list_id: list.id });
            }}
          >
            Add a card...
          </button>
          <hr />
          <button onClick={() => handleMode("sort")}>Sort by...</button>
          <hr />
          <button onClick={() => handleMode("move")}>
            Move all cards in this list...
          </button>
          <button onClick={() => handleMode("archive")}>
            Archive all cards in this list...
          </button>
          <hr />
          <button onClick={() => handleArchive(list.id)}>
            Archive this list
          </button>
        </>
      )}

      {mode === "sort" && (
        <>
          <button onClick={() => handleSort(list.id, "createdLast")}>
            Date created (newest first)
          </button>
          <button onClick={() => handleSort(list.id, "createdFirst")}>
            Date created (oldest first)
          </button>
          <button onClick={() => handleSort(list.id, "alphabet")}>
            Card name (alphabetically)
          </button>
        </>
      )}

      {mode === "move" &&
        allLists.map(
          (childList) =>
            !childList.id.includes("add-list") && (
              <button
                key={`move-to-${childList.id}`}
                disabled={childList.id === list.id}
                onClick={() => handleMoveAllCards(list.id, childList.id)}
              >
                {childList.name} {childList.id === list.id ? "(current)" : ""}
              </button>
            )
        )}

      {mode === "archive" && (
        <>
          <p>
            This will remove all the cards in this list from the board. To view
            archived cards and bring them back to the board, click "Menu" {">"}{" "}
            "Archived items".
          </p>
          <button
            className="warning"
            onClick={() => handleArchiveAllCards(list.id)}
          >
            Archive all
          </button>
        </>
      )}
    </div>
  );
};

export default ListActions;
