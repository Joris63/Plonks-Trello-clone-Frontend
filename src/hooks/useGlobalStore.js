import { useContext } from "react"
import StoreContext from "../context/StoreProvider"

const useGlobalStore = () => {
    return useContext(StoreContext);
}

export default useGlobalStore;