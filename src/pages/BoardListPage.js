import { useState } from "react";
import CustomSelect from "../components/helpers/CustomSelect";

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

const BoardListPage = () => {
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
        <div className="board_btn_wrapper favorite">
          <div>
            <div className="board_btn_title">Random board</div>
            <div className="board_btn_activity">Last updated 1 hour ago</div>
          </div>
          <div className="board_btn_members_list">
            <div className="board_btn_member_wrapper">
              {false ? (
                <img className="board_btn_member" src="" alt="profile" />
              ) : (
                <div className="board_btn_member">
                  <i className={`fa-solid fa-j`}></i>
                </div>
              )}
            </div>
            <div className="board_btn_member_wrapper">
              {false ? (
                <img className="board_btn_member" src="" alt="profile" />
              ) : (
                <div className="board_btn_member">
                  <i className={`fa-solid fa-j`}></i>
                </div>
              )}
            </div>
            <div className="board_btn_member_wrapper">
              {false ? (
                <img className="board_btn_member" src="" alt="profile" />
              ) : (
                <div className="board_btn_member">
                  <i className={`fa-solid fa-j`}></i>
                </div>
              )}
            </div>
            <div className="board_btn_member add">
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardListPage;
