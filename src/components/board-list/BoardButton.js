import _ from "lodash";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FormatTime } from "../../utils/helpers/common.helpers";
import { FireToast } from "../../utils/helpers/toasts.helpers";

const BoardButton = ({ board, boards, setBoards }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
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

  return (
    <div
      key={`board-${board?.id}`}
      style={{ backgroundColor: board?.color }}
      className={`board_btn_wrapper ${board?.favorited ? "favorite" : ""}`}
      onClick={() => navigate(`/board/${board.id}`)}
    >
      <div>
        <div className="board_btn_title">{board?.title}</div>
        <div className="board_btn_activity">
          Last updated {FormatTime(board?.lastUpdated)?.toLowerCase()}
        </div>
        <div
          className="board_btn_edit"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/board/edit/${board.id}`);
          }}
        >
          <i className={`fa-solid fa-pen`}></i>
        </div>
        <div
          className="board_btn_star"
          onClick={(e) => {
            e.stopPropagation();
            FavoriteBoard(board.id, !board?.favorited);
          }}
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
                  referrerPolicy="no-referrer"
                  alt="profile"
                />
              ) : (
                <div className="board_btn_member">
                  <i className={`fa-solid fa-${member.username.charAt()}`}></i>
                </div>
              )}
            </div>
          ))}
        <div className="board_btn_member_wrapper">
          <div className="board_btn_member add">
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardButton;
