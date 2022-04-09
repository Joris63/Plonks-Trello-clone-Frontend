import { createContext, useState } from "react";

const BoardContext = createContext({});

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState({});

  return (
    <BoardContext.Provider value={{ board, setBoard, lists, setLists }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
