import { useState } from "react";
import Dropdown from "../helpers/Dropdown";
import useBoard from "../../hooks/useBoard";

const ListOptionsDropdown = ({ list, open, anchor, handleClose }) => {
  const [mode, setMode] = useState("default");

  const { board } = useBoard();

  function getTitle() {
    switch (mode) {
      case "sort":
        return "Sort list";
      case "move-c":
        return "Move all cards in list";
      case "archive-c":
        return "Archive all cards in this list?";
      default:
        return "List actions";
    }
  }

  return (
    <Dropdown
      open={open}
      anchor={anchor}
      handleClose={() => {
        handleClose();
        setTimeout(() => setMode("default"), 200);
      }}
      offset={{ y: 0.5 }}
    >
      <header className="dropdown_header">
        {mode !== "default" && (
          <button
            className="dropdown_header_btn left"
            onClick={(e) => {
              e.stopPropagation();
              setMode("default");
            }}
          >
            <i className="fa-regular fa-angle-left"></i>
          </button>
        )}
        <div className="dropdown_title">{getTitle()}</div>
      </header>
      <ul className="dropdown_actions_list" style={{ width: 300 }}>
        {mode === "default" && (
          <>
            <li className="dropdown_action_wrapper">
              <button className="dropdown_action" onClick={handleClose}>
                Add card...
              </button>
            </li>
            <li className="dropdown_action_separator"></li>
            <li className="dropdown_action_wrapper">
              <button
                className="dropdown_action"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("sort");
                }}
              >
                Sort by...
              </button>
            </li>
            <li className="dropdown_action_separator"></li>
            <li className="dropdown_action_wrapper">
              <button
                className="dropdown_action"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("move-c");
                }}
              >
                Move all cards in this list...
              </button>
            </li>
            <li className="dropdown_action_wrapper">
              <button
                className="dropdown_action"
                onClick={(e) => {
                  e.stopPropagation();
                  setMode("archive-c");
                }}
              >
                Archive all cards in this list...
              </button>
            </li>
            <li className="dropdown_action_separator"></li>
            <li className="dropdown_action_wrapper">
              <button className="dropdown_action" onClick={handleClose}>
                Archive this list
              </button>
            </li>
          </>
        )}
        {mode === "sort" && (
          <>
            <li className="dropdown_action_wrapper">
              <button className="dropdown_action" onClick={handleClose}>
                Date created (newest first)
              </button>
            </li>
            <li className="dropdown_action_wrapper">
              <button className="dropdown_action" onClick={handleClose}>
                Date created (oldest first)
              </button>
            </li>
            <li className="dropdown_action_wrapper">
              <button className="dropdown_action" onClick={handleClose}>
                Card name (alphabetically)
              </button>
            </li>
          </>
        )}
        {mode === "move-c" && (
          <>
            {board?.lists?.map((boardList) => (
              <li
                key={`move-cards-to-${boardList.id}`}
                className="dropdown_action_wrapper"
              >
                <button
                  className="dropdown_action"
                  disabled={boardList.id === list.id}
                  onClick={handleClose}
                >
                  {boardList.title} {boardList.id === list.id && "(current)"}
                </button>
              </li>
            ))}
          </>
        )}
        {mode === "archive-c" && (
          <>
            <div className="dropdown_text">
              This will remove all the cards in this list from the board. To
              view archived cards and bring them back to the board, click “Menu”
              {">"} “Archived Items.”
            </div>
            <button className="dropdown_confirm_btn warning">
              Archive all
            </button>
          </>
        )}
      </ul>
    </Dropdown>
  );
};

export default ListOptionsDropdown;
