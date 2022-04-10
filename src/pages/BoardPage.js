import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  
  useEffect(() => {
    GetBoard();
  }, []);

  return <div className="page_content"></div>;
};

export default BoardPage;
