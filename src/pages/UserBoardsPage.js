const BoardsFilter = () => {
  return (
    <div className="board_filter_wrapper">
      <label className="board_filter_wrapper_label">Sort by</label>
      <div className="board_filter_select">
        <div value="activity-desc" defaultChecked>
          Most recently active
        </div>
        <div value="activity-asc">Last recently active</div>
        <div value="alpha-desc">Alphabetically A-Z</div>
        <div value="alpha-asc">Alphabetically Z-A</div>
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

const UserBoardsPage = () => {
  return (
    <div className="page_content">
      <div className="page_title">Your boards</div>
      <div className="boards_page_header">
        <BoardsFilter />
        <BoardsSearch />
      </div>
      <div className="boards_list"></div>
    </div>
  );
};

export default UserBoardsPage;
