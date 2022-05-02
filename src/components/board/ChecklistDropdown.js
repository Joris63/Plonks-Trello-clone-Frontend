import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGlobalStore from "../../hooks/useGlobalStore";
import { FireToast } from "../../utils/helpers/toasts.helpers";
import Form from "../form/Form";
import Dropdown from "../helpers/Dropdown";

const checklistFields = [
  {
    label: "Title",
    placeholder: "Your checklist title",
    value: "Checklist",
    whitespaces: true,
  },
];

const ChecklistDropdown = ({ open, anchor, onClose }) => {
  const [id, setId] = useState(`checklist-form-${uuidv4()}`);

  const { cardId } = useGlobalStore();

  const axiosPrivate = useAxiosPrivate();

  async function handleSubmit(data) {
    await axiosPrivate
      .post(`/checklist/add`, { cardId, ...data })
      .then((response) => {
        console.log(response.data);
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
    if (!open) {
      setId(`login-form-${uuidv4()}`);
    }
  }, [open]);

  return (
    <Dropdown
      open={open}
      anchor={anchor}
      offset={{ y: 50 }}
      handleClose={onClose}
    >
      <div className="dropdown_header">
        <div className="dropdown_header_title">Add Checklist</div>
        <button className="dropdown_close_btn" onClick={onClose}>
          <i className="fa-regular fa-xmark"></i>
        </button>
      </div>
      <div className="dropdown_content">
        <Form
          id={id}
          formName="checklist"
          fields={checklistFields}
          buttonProps={{ text: "Add", class: "custom_form_submit_btn" }}
          onSubmit={handleSubmit}
        />
      </div>
    </Dropdown>
  );
};

export default ChecklistDropdown;
