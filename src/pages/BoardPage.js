import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    placeholder: "Your list title",
    whitespaces: true,
  },
];

const BoardPage = () => {
  const [listModalOpen, setListModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { board, setBoard } = useBoard();
  const { boardId } = useParams();

  const navigate = useNavigate();

  const cardFields = [
    {
      label: "Title",
      placeholder: "your card title",
      whitespaces: true,
    },
    {
      label: "List",
      type: "select",
      options:
        board?.lists?.map((list, index) => ({
          name: list.title,
          abbr: list.id,
          active: index === 0 ? true : false,
        })) || [],
    },
  ];

  async function GetBoard() {
    const data = { userId: auth?.user?.id, boardId };

    await axiosPrivate
      .post("/board/get", data)
      .then((response) => {
        setBoard(response?.data);

        GetBoardLists(response?.data);
      })
      .catch((err) => {
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else if (err.response?.status === 401) {
          FireToast("Unauthorized.", "error");
        } else {
          FireToast("Something went wrong.", "error");
        }

        navigate("/");
      });
  }

  async function GetBoardLists(board) {
    await axiosPrivate
      .get(`/list/all/${boardId}`)
      .then((response) => {
        setBoard({ ...board, lists: response.data });
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

  async function AddList(data) {
    await axiosPrivate
      .post(`/list/add`, { ...data, boardId })
      .then((response) => {
        setListModalOpen(false);

        setBoard({
          ...board,
          lists: [
            ...board?.lists,
            {
              id: response.data,
              ...data,
              order: board?.lists?.length,
              boardId,
            },
          ],
        });

        FireToast("List added.", "success");
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
            <i className="fa-solid fa-plus"></i>
            <div>Add List</div>
          </button>
          {board?.lists?.length > 0 && (
            <button
              className="board_page_btn"
              onClick={() => setCardModalOpen(true)}
            >
              <i className="fa-solid fa-plus"></i>
              <div>Add Card</div>
            </button>
          )}
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
              {board?.lists?.map((list, index) => (
                <List key={`list-${list.id}`} list={list} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddBoardItemModal
        open={listModalOpen}
        handleClose={() => setListModalOpen(false)}
        fields={listFields}
        title="Create list"
        handleSubmit={(data) => AddList(data)}
      />
      {board?.lists?.length > 0 && (
        <AddBoardItemModal
          open={cardModalOpen}
          handleClose={() => setCardModalOpen(false)}
          fields={cardFields}
          title="Create card"
          handleSubmit={(data) => {
            console.log(data);
          }}
        />
      )}
    </div>
  );
};

export default BoardPage;
