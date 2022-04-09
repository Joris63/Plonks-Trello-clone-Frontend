import { useContext } from "react"
import BoardContext from "../context/AuthProvider"

const useBoard = () => {
    return useContext(BoardContext);
}

export default useBoard;