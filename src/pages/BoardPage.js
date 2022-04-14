import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBoard from "../hooks/useBoard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FireToast } from "../utils/helpers/toasts.helpers";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import List from "../components/board/List";

const BoardPage = () => {
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

  useEffect(() => {
    GetBoard();
  }, []);

  return (
    <div className="page_content">
      <div>
        <div className="board_header">
          <div className="board_title">{board?.title}</div>
          <div className="board_actions_list">
            <button
              className={`board_star_btn ${board?.favorited ? "favorite" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <i
                className={`animate__animated fa-${
                  board?.favorited ? "solid animate__tada" : "regular"
                } fa-star`}
              ></i>
            </button>
            <button className="board_settings_btn">Settings</button>
          </div>
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
    </div>
  );
};

export default BoardPage;
