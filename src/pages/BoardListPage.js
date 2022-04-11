import _ from "lodash";
import { useEffect, useState } from "react";
import AddBoardModal from "../components/board-list/AddBoardModal";
import BoardButton from "../components/board-list/BoardButton";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FireToast } from "../utils/helpers/toasts.helpers";
import BoardsSearch from "../components/board-list/BoardsSearch";
import BoardsFilter from "../components/board-list/BoardsFilter";

const BoardListPage = () => {
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  function handleSort(filter) {
    let updatedBoards = _.cloneDeep(boards);

    switch (filter) {
      case "activity-desc":
        updatedBoards = _.sortBy(updatedBoards, ["lastUpdated"]).reverse();
        break;
      case "activity-asc":
        updatedBoards = _.sortBy(updatedBoards, ["lastUpdated"]);
        break;
      case "alphabet-desc":
        updatedBoards = _.sortBy(updatedBoards, ["title"]).reverse();
        break;
      case "alphabet-asc":
        updatedBoards = _.sortBy(updatedBoards, ["title"]);
        break;
      default:
        break;
    }

    setBoards(updatedBoards);
  }

  async function getAllBoards() {
    await axiosPrivate
      .get(`/board/all/${auth?.user?.id}`)
      .then((response) => {
        setBoards(response?.data);
      })
      .catch((err) => {
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else if (err.response?.status === 401) {
          FireToast("Unauthorized.", "error");
        } else {
          FireToast("Something went wrong.", "error");
        }
      });
  }

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div className="page_content">
      <div className="page_title">Your boards</div>
      <div className="boards_page_header">
        <BoardsFilter handleSort={handleSort} />
        <BoardsSearch search={search} setSearch={setSearch} />
      </div>
      <div className="boards_list_count">
        Showing{" "}
        {
          boards?.filter(
            (board) =>
              board.title.toLowerCase().includes(search.toLowerCase()) ||
              search.toLowerCase().includes(board.title.toLowerCase())
          )?.length
        }{" "}
        of {boards?.length} boards
      </div>
      <div className="boards_list">
        <div
          className="board_btn_wrapper add_board"
          onClick={() => setOpen(true)}
        >
          <div className="add_board_btn_text">Create new board</div>
        </div>
        {boards
          .filter(
            (board) =>
              board.title.toLowerCase().includes(search.toLowerCase()) ||
              search.toLowerCase().includes(board.title.toLowerCase())
          )
          .map((board) => (
            <BoardButton
              key={`board-${board?.id}`}
              board={board}
              boards={boards}
              setBoards={setBoards}
            />
          ))}
      </div>
      <AddBoardModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default BoardListPage;
