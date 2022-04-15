import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBoard from "../hooks/useBoard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FireToast } from "../utils/helpers/toasts.helpers";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import List from "../components/board/List";
import AddBoardItemModal from "../components/board/AddBoardItemModal";

const listFields = [
  {
    label: "Title",
    placeholder: "your list title",
  },
];

const cardFields = [
  {
    label: "Title",
    placeholder: "your card title",
  },
];

const BoardPage = () => {
  const [listModalOpen, setListModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { board, setBoard } = useBoard();
  const { boardId } = useParams();

  async function GetBoard() {
    const data = { userId: auth?.user?.id, boardId };

    await axiosPrivate
      .post("/board/get", data)
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

  async function FavoriteBoard(favorite) {
    await axiosPrivate
      .post(`/board/favorite`, { boardId, userId: auth?.user?.id, favorite })
      .then((response) => {
        setBoard({ ...board, favorited: favorite });
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
      <div>
        <div className="board_header">
          <div className="board_title">{board?.title}</div>
          <button
            className={`board_page_icon_btn ${
              board?.favorited ? "favorite" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              FavoriteBoard(!board?.favorited);
            }}
          >
            <i
              className={`animate__animated fa-${
                board?.favorited ? "solid animate__tada" : "regular"
              } fa-star`}
            ></i>
          </button>
          <button
            className="board_page_btn"
            onClick={() => setListModalOpen(true)}
          >
            <i class="fa-solid fa-plus"></i>
            <div>Add List</div>
          </button>
          <button
            className="board_page_btn"
            onClick={() => setCardModalOpen(true)}
          >
            <i class="fa-solid fa-plus"></i>
            <div>Add Card</div>
          </button>
          <div className="board_members" style={{ marginLeft: "auto" }}>
            {board?.members
              ?.filter((member, index) => index < 5)
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
                      <i
                        className={`fa-solid fa-${member.username.charAt()}`}
                      ></i>
                    </div>
                  )}
                </div>
              ))}
            {board?.members?.filter((member, index) => index >= 5).length >
              0 && (
              <div className="board_btn_member_wrapper">
                <div className="board_btn_member add">
                  +
                  {board?.members?.filter((member, index) => index >= 5).length}
                </div>
              </div>
            )}
          </div>
          <button className="board_page_btn">
            <i className="fa-regular fa-user-plus"></i>
            <div>Share</div>
          </button>
          <button className="board_page_btn">
            <i className="fa-regular fa-filter"></i>
            <div>Filters</div>
          </button>
          <button className="board_page_btn">
            <i className="fa-regular fa-ellipsis"></i>
            <div>Show menu</div>
          </button>
        </div>
      </div>
      <DragDropContext>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div
              className="lists_container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <List />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddBoardItemModal
        open={listModalOpen}
        handleClose={() => setListModalOpen(false)}
        fields={listFields}
        title="Add list"
        handleSubmit={() => {}}
      />
      <AddBoardItemModal
        open={cardModalOpen}
        handleClose={() => setCardModalOpen(false)}
        fields={cardFields}
        title="Add card"
        handleSubmit={() => {}}
      />
    </div>
  );
};

export default BoardPage;
