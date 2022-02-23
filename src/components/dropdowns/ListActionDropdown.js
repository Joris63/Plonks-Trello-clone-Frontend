import React, { useEffect, useLayoutEffect, useState } from "react";
import DropDown from "../DropDown";

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

const ListActionDropdown = ({
  list,
  setList,
  allLists,
  setNewCard,
  ...handlers
}) => {
  const [dropdownMode, setDropdownMode] = useState("default");
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    const location = document
      .getElementById(`list-action-${list?.id}`)
      ?.getBoundingClientRect();

    if (location) {
      setPosition({ x: location?.left, y: location?.top });
    }

    if (!list) {
      setPosition(null);
      setDropdownMode("default");
    }
  }, [list]);

  function getDropdownTitle() {
    let title = "List Actions";

    switch (dropdownMode) {
      case "sort":
        title = "Sort list";
        break;

      case "move":
        title = "Move all cards in list";
        break;

      case "archive":
        title = "Archive all cards in list";
        break;

      default:
        break;
    }

    return title;
  }

  return (
    <DropDown
      open={list}
      position={position}
      mode={dropdownMode}
      handleMode={setDropdownMode}
      handleBack={() => setDropdownMode("default")}
      id="list-action-drpdwn"
      handleClose={() => setList(null)}
      title={getDropdownTitle()}
    >
      <ListActions
        list={list}
        allLists={allLists}
        mode={dropdownMode}
        handleMode={setDropdownMode}
        handleClose={() => setList(null)}
        setNewCard={setNewCard}
        {...handlers}
      />
    </DropDown>
  );
};

export default ListActionDropdown;
