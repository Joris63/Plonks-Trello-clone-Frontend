import _ from "lodash";
import { useEffect, useState } from "react";
import AddBoardModal from "../components/AddBoardModal";
import CustomSelect from "../components/helpers/CustomSelect";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FormatTime } from "../utils/helpers/common.helpers";
import { FireToast } from "../utils/helpers/toasts.helpers";

const filterOptions = [
  { name: "Most recently active", abbr: "activity-desc", active: true },
  { name: "Last recently active", abbr: "activity-asc" },
  { name: "Alphabetically A-Z", abbr: "alphabet-asc" },
  { name: "Alphabetically Z-A", abbr: "alphabet-desc" },
];

const BoardsFilter = ({ handleSort }) => {
  const [options, setOptions] = useState(filterOptions);

  useEffect(() => {
    handleSort(options.find((option) => option.active).abbr);
  }, [options]);

  return (
    <div className="board_filter_wrapper">
      <label className="board_filter_wrapper_label">Sort by</label>
      <div className="board_filter_select">
        <CustomSelect
          name="board-select"
          options={options}
          onChange={setOptions}
        />
      </div>
    </div>
  );
};

const BoardsSearch = ({ search, setSearch }) => {
  return (
    <div className="board_filter_wrapper">
      <label className="board_filter_wrapper_label">Search</label>
      <div className="board_filter_search">
        <input
          className="board_filter_search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search boards"
        />
      </div>
    </div>
  );
};

const BoardListPage = () => {
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  function handleFavorite(boardId, favorited) {
    const updatedBoards = _.cloneDeep(boards);
    const board = boards.find((board) => board.id === boardId);

    updatedBoards.splice(boards.indexOf(board), 1, {
      ...board,
      favorited,
    });

    setBoards(updatedBoards);
  }

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

  async function FavoriteBoard(boardId, favorite) {
    await axiosPrivate
      .post(`/board/favorite`, { boardId, userId: auth?.user?.id, favorite })
      .then((response) => {
        handleFavorite(boardId, favorite);
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
      <div className="boards_list_count">Showing 1 of 1 boards</div>
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
            <div
              key={`board-${board?.id}`}
              style={{ backgroundColor: board?.color }}
              className={`board_btn_wrapper ${
                board?.favorited ? "favorite" : ""
              }`}
            >
              <div>
                <div className="board_btn_title">{board?.title}</div>
                <div className="board_btn_activity">
                  Last updated {FormatTime(board?.lastUpdated)?.toLowerCase()}
                </div>
                <div
                  className="board_btn_star"
                  onClick={() => FavoriteBoard(board.id, !board?.favorited)}
                >
                  <i
                    className={`animate__animated fa-${
                      board?.favorited ? "solid animate__tada" : "regular"
                    } fa-star`}
                  ></i>
                </div>
              </div>
              <div className="board_btn_members_list">
                {board?.members
                  ?.filter((member, index) => index < 4)
                  .map((member) => (
                    <div
                      key={`board-${board?.id}-member-${member?.id}`}
                      className="board_btn_member_wrapper"
                    >
                      {member?.picturePath ? (
                        <img
                          className="board_btn_member"
                          src={member?.picturePath}
                          alt="profile"
                        />
                      ) : (
                        <div className="board_btn_member">
                          <i
                            className={`fa-solid fa-${member.username.charAt()}`}
                          ></i>
                        </div>
                      )}
                    </div>
                  ))}
                <div
                  style={{
                    transform: `translateX(${
                      board?.members?.filter((member, index) => index < 4)
                        .length * -10
                    }px)`,
                  }}
                  className="board_btn_member add"
                >
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
          ))}
      </div>
      <AddBoardModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default BoardListPage;
