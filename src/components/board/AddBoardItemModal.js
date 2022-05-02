import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "../form/Form";
import Modal from "../helpers/Modal";

const AddBoardItemModal = ({
  open,
  handleClose,
  fields,
  title,
  handleSubmit,
}) => {
  const [id, setId] = useState(`${title.toLowerCase()}-form-${uuidv4()}`);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setId(`login-form-${uuidv4()}`);
      setError(null);
    }
  }, [open]);

  return (
    <Modal open={open} handleClose={handleClose}>
      <div className="modal_header">
        <div className="modal_header_title">{title}</div>
        <button className="modal_close_btn" onClick={handleClose}>
          <i className="fa-regular fa-xmark"></i>
        </button>
      </div>
      <div className="modal_content">
        {error && <div className="form_error">{error}</div>}
        <div className="add_board_item_fields">
          <Form
            id={id}
            formName={title.toLowerCase()}
            fields={fields}
            buttonProps={{ text: title, class: "custom_form_submit_btn" }}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddBoardItemModal;
