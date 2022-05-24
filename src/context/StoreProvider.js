import { createContext, useState } from "react";

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [cardId, setCardId] = useState(null);

  return (
    <StoreContext.Provider
      value={{ board, setBoard, lists, setLists, cardId, setCardId }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
