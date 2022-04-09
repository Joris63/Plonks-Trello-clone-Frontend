import { createContext, useState } from "react";

const BoardContext = createContext({});

export const BoardProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <BoardContext.Provider value={{auth, setAuth}}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardContext;