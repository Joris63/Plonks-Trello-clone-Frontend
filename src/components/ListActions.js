import React from "react";

const ListActions = ({
  list,
  allLists = [],
  mode,
  handleMode,
  handleClose,
  setNewCard,
}) => {
  return (
    <div className="actions_list">
      {mode === "default" && (
        <>
          <button
            onClick={() => {
              handleClose();
              setNewCard({ list_id: list.id, list_name: list.name });
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
          <button>Archive this list</button>
        </>
      )}

      {mode === "sort" && (
        <>
          <button
            onClick={() => {
              handleClose();
              setNewCard({ list_id: list.id, list_name: list.name });
            }}
          >
            Date created (newest first)
          </button>
          <button onClick={() => handleMode("sort")}>
            Date created (oldest first)
          </button>
          <button onClick={() => handleMode("move")}>
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
                onClick={() => {}}
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
          <button className="warning" onClick={() => {}}>
            Archive all
          </button>
        </>
      )}
    </div>
  );
};

export default ListActions;
