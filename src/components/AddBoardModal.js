import { useEffect, useState } from "react";
import { CheckField } from "../utils/helpers/validation.helpers";
import { ReactComponent as BoardPreview } from "../assets/board-preview.svg";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import FormField from "./form/FormField";
import Modal from "./helpers/Modal";
import { FireToast } from "../utils/helpers/toasts.helpers";
import useAuth from "../hooks/useAuth";

const backgroundColors = [
  "#5352ed",
  "#1e90ff",
  "#2ed573",
  "#ffa502",
  "#ff6348",
  "#ff4757",
];

const AddBoardModal = ({ open, handleClose, handleAddBoard }) => {
  const [fields, setFields] = useState(setInitialState());
  const [touched, setTouched] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const titleField = {
    label: "Title",
    value: fields.title,
    touched,
    optional: false,
    fullWidth: true,
    whitespaces: true,
  };

  useEffect(() => {
    if (!open) {
      setFields(setInitialState());
      setTouched(false);
    }
  }, [open]);

  function setInitialState() {
    return { title: "", color: backgroundColors[0] };
  }

  async function handleSubmit(data) {
    await axiosPrivate
      .post("/board/add", { ...data, userId: auth?.user?.id })
      .then((response) => {
        const { data, message } = response?.data;

        handleClose();

        FireToast(message, "success");

        handleAddBoard();
        /*setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);*/
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
    <Modal open={open} handleClose={handleClose}>
      <div className="modal_header">
        <div className="modal_header_title">Create board</div>
        <button className="modal_close_btn" onClick={handleClose}>
          <i className="fa-regular fa-xmark"></i>
        </button>
      </div>
      <div className="modal_content">
        <div className="add_board_fields">
          <div className="add_board_background_field">
            <label className="form_field_label">Color</label>
            <ul className="board_background_option_list">
              {backgroundColors.map((color, index) => (
                <li
                  key={`board-background-${index}`}
                  className="board_background_option_wrapper"
                >
                  <button
                    style={{ backgroundColor: color }}
                    className={`board_background_option ${
                      color === fields.color ? "active" : ""
                    }`}
                    onClick={() => setFields({ ...fields, color })}
                  ></button>
                </li>
              ))}
            </ul>
          </div>
          <FormField
            formName="add-board"
            field={titleField}
            handleChange={(e) =>
              setFields({ ...fields, title: e.target.value })
            }
            handleTouch={(name, touched) => setTouched(touched)}
          />
          <button
            disabled={fields.title === "" || CheckField()}
            className="add_board_submit_btn"
            onClick={() => handleSubmit(fields)}
          >
            Create board
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddBoardModal;
