import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGlobalStore from "../hooks/useGlobalStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FireToast } from "../utils/helpers/toasts.helpers";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import List from "../components/board/List";
import BoardHeader from "../components/board/BoardHeader";
import { SortCards, SortLists } from "../utils/helpers/board.helpers";
import LoadingPage from "../components/helpers/LoadingPage";
import _ from "lodash";

import waitingGif from "../assets/mr-bean-waiting.gif";
import CardModal from "../components/board/CardModal";

const BoardPage = () => {
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { board, setBoard, cardId, setCardId } = useGlobalStore();
  const { boardId } = useParams();

  const navigate = useNavigate();

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

        setLoading(false);
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

  async function ReorderLists(board) {
    await axiosPrivate
      .post(`/list/reorder`, { lists: board.lists, boardId: boardId })
      .then((response) => {
        FireToast(response.data, "success");
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

  function onDragEnd(result) {
    const { draggableId, destination, type } = result;

    if (!destination) {
      return;
    }

    let updatedBoard = _.cloneDeep(board);

    switch (type) {
      case "card":
        updatedBoard = SortCards(
          board,
          draggableId,
          destination.droppableId,
          destination.index
        );
        break;
      case "list":
        const draggedListOrder = updatedBoard?.lists?.find(
          (list) => list.id === draggableId
        )?.order;

        if (draggedListOrder === destination.index) {
          return;
        }

        updatedBoard = SortLists(board, draggableId, destination.index);

        ReorderLists(updatedBoard);
        break;
      default:
        break;
    }

    setBoard(updatedBoard);
  }

  useEffect(() => {
    GetBoard();
  }, []);

  return (
    <div className="page_content">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <BoardHeader boardId={boardId} />
          <DragDropContext onDragEnd={onDragEnd}>
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
                  {(board?.lists?.length < 1 || !board?.lists) && (
                    <div className="no_lists">
                      It seems like no lists have been added yet...
                      <img src={waitingGif} alt="loading..." />
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <CardModal cardId={cardId} handleClose={() => setCardId(null)} />
        </>
      )}
    </div>
  );
};

export default BoardPage;
