import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoardLists from "../components/BoardLists";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FormatTime } from "../utils/helpers/common.helpers";
import { FireToast } from "../utils/helpers/toasts.helpers";

const BoardPage = () => {
  const [board, setBoard] = useState({});

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { boardId } = useParams();

  async function GetBoard() {
    const data = { userId: auth?.user?.id, boardId };

    await axiosPrivate
      .post("/board", data)
      .then((response) => {
        setBoard(response?.data);
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

  async function FavoriteBoard() {
    await axiosPrivate
      .post(`/board/favorite`, {
        boardId,
        userId: auth?.user?.id,
        favorite: !board.favorited,
      })
      .then((response) => {
        setBoard({ ...board, favorited: !board.favorited });
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
    GetBoard();
  }, []);

  return (
    <div className="page_content">
      <div className="board_page_header">
        <div>
          <div
            className={`board_page_title_wrapper ${
              board?.favorited ? "favorite" : ""
            }`}
          >
            <div style={{ margin: 0 }} className="page_title">
              {board?.title}
              <div
                style={{ backgroundColor: board?.color }}
                className="board_page_title_underline"
              ></div>
            </div>
            <div className="board_page_star_btn" onClick={FavoriteBoard}>
              <i
                className={`animate__animated fa-${
                  board?.favorited ? "solid animate__tada" : "regular"
                } fa-star`}
              ></i>
            </div>
            <Link
              className="board_page_edit_btn"
              to={`/board/edit/${board?.id}`}
            >
              <i className="fa-solid fa-pen"></i>
            </Link>
          </div>
          <div className="board_page_last_update">
            Last update • {FormatTime(board?.lastUpdated)?.toLowerCase()}
          </div>
        </div>
        <div className="board_page_members">
          <div className="board_page_members_text">Members</div>
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
            <div className="board_btn_member_wrapper">
              <div className="board_btn_member add">
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BoardLists />
    </div>
  );
};

export default BoardPage;
