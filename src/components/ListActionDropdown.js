import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import ListActions from "./ListActions";

const ListActionDropdown = ({
  listId,
  setListId,
  allLists,
  setNewCard,
  handleSort,
  handleMoveAllCards,
  handleArchiveAllCards,
  handleArchive,
}) => {
  const [dropdownMode, setDropdownMode] = useState("default");
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const location = document
      .getElementById(`list-action-${listId}`)
      ?.getBoundingClientRect();

    if (location) {
      setPosition({ x: location.left, y: location.top });
    }

    if (!listId) {
      setPosition(null);
      setDropdownMode("default");
    }
  }, [listId]);

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
      open={listId}
      position={position}
      mode={dropdownMode}
      handleMode={setDropdownMode}
      handleBack={() => setDropdownMode("default")}
      id="list-action-drpdwn"
      handleClose={() => setListId(null)}
      title={getDropdownTitle()}
    >
      <ListActions
        listId={listId}
        allLists={allLists}
        mode={dropdownMode}
        handleMode={setDropdownMode}
        handleClose={() => setListId(null)}
        setNewCard={setNewCard}
      />
    </DropDown>
  );
};

export default ListActionDropdown;
