import _ from "lodash";
import { useState } from "react";
import CustomSelect from "../components/helpers/CustomSelect";
import Modal from "../components/helpers/Modal";
import { FormatTime } from "../utils/helpers/common.helpers";

const filterOptions = [
  { name: "Most recently active", abbr: "activity-desc", active: true },
  { name: "Last recently active", abbr: "activity-asc" },
  { name: "Alphabetically A-Z", abbr: "alpha-asc" },
  { name: "Alphabetically Z-A", abbr: "alpha-desc" },
];

const BoardsFilter = () => {
  const [options, setOptions] = useState(filterOptions);

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

const boardsList = [
  {
    id: "7a98a16a-b665-43ee-929e-e59d7060f3c1",
    title: "Board",
    color: "#a55eea",
    members: [],
    lastUpdated: 1649098893480,
    favorited: true,
  },
];

const BoardListPage = () => {
  const [boards, setBoards] = useState(boardsList);

  function handleFavorite(boardId) {
    const updatedBoards = _.cloneDeep(boards);
    const board = boards.find((board) => board.id === boardId);

    updatedBoards.splice(boards.indexOf(board), 1, {
      ...board,
      favorited: !board?.favorited,
    });

    setBoards(updatedBoards);
  }

  return (
    <div className="page_content">
      <div className="page_title">Your boards</div>
      <div className="boards_page_header">
        <BoardsFilter />
        <BoardsSearch />
      </div>
      <div className="boards_list_count">Showing 1 of 1 boards</div>
      <div className="boards_list">
        <div className="board_btn_wrapper add_board">
          <div className="add_board_btn_text">Create new board</div>
        </div>
        {boards.map((board) => (
          <div
            key={`board-${board?.id}`}
            style={{ backgroundColor: board?.color }}
            className={`board_btn_wrapper ${board?.favorited ? "favorite" : ""}`}
          >
            <div>
              <div className="board_btn_title">{board?.title}</div>
              <div className="board_btn_activity">
                Last updated {FormatTime(board?.lastUpdated)?.toLowerCase()}
              </div>
              <div
                className="board_btn_star"
                onClick={() => handleFavorite(board.id)}
              >
                <i
                  className={`fa-${
                    board?.favorited ? "solid" : "regular"
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
                          className={`fa-solid fa-${member.username.atChar()}`}
                        ></i>
                      </div>
                    )}
                  </div>
                ))}
              <div className="board_btn_member add">
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardListPage;
