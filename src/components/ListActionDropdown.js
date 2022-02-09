import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import ListActions from "./ListActions";

const ListActionDropdown = ({
  list,
  setList,
  allLists,
  setNewCard,
  ...handlers
}) => {
  const [dropdownMode, setDropdownMode] = useState("default");
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const location = document
      .getElementById(`list-action-${list?.id}`)
      ?.getBoundingClientRect();

    if (location) {
      setPosition({ x: location.left, y: location.top });
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
