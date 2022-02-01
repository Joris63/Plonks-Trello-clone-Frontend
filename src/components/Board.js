import React from "react";
import "../styles/board.scss";
import List from "./List";

const Board = (props) => {
  return (
    <div className="board">
      {Array.from(Array(3).keys()).map((index) => (
        <List id={index} key={`list-${index}`} />
      ))}
    </div>
  );
};

export default Board;
