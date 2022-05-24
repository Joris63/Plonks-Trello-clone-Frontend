import { FormatTime } from "../../helpers/common.helpers";
import Modal from "../helpers/Modal";
import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FireToast } from "../../helpers/toasts.helpers";
import ChecklistDropdown from "./ChecklistDropdown";
import Textarea from "../form/Textarea";

const CardDescription = ({ card, setCard }) => {
  const [description, setDescription] = useState({
    open: false,
    value: card?.description,
  });

  return (
    <div className="card_details_item">
      <div className="card_details_item_header">
        <div className="card_detail_title_icon">
          <i className="fa-regular fa-align-left"></i>
        </div>
        <div className="card_detail_name">Description</div>
        <button
          className="card_detail_action_btn"
          onClick={(e) => {
            e.stopPropagation();
            setDescription({ open: true, value: card?.description });
          }}
        >
          Edit
        </button>
      </div>
      <div style={{ marginLeft: 40 }}>
        {!description.open && (
          <div className="card_detail_description">
            {card?.description === "" || !card?.description
              ? "No description added yet..."
              : card?.description}
          </div>
        )}
        {description.open && (
          <div style={{ width: "100%" }}>
            <Textarea
              value={description.value}
              onChange={(e) =>
                setDescription({
                  ...description,
                  value: e.target.value,
                })
              }
            />
            <div className="card_detail_form_actions">
              <button className="card_detail_form_save">Save</button>
              <button
                className="card_detail_form_close"
                onClick={(e) => {
                  e.stopPropagation();
                  setDescription({ open: false, value: card?.description });
                }}
              >
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CardChecklistItem = ({ item, index, card, setCard }) => {
  return (
    <Draggable draggableId={item?.id} index={index}>
      {(provided, snapshot) => (
        <li
          className="card_detail_checklist_item"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <input
            className="card_detail_checklist_item_checkbox"
            id="card-checkbox-1"
            type="checkbox"
            value="value1"
            checked={item?.complete}
          />
          <label
            className="card_detail_checklist_item_name"
            htmlFor="card-checkbox-1"
          >
            {item?.content}
          </label>
          <button className="card_detail_checklist_item_btn">
            <i className="fa-regular fa-ellipsis"></i>
          </button>
        </li>
      )}
    </Draggable>
  );
};

const CardChecklist = ({ checklist, card, setCard }) => {
  const [editedChecklist, setEditedChecklist] = useState({
    open: false,
    value: checklist?.title,
  });
  const [item, setItem] = useState({ open: false, value: "" });
  const axiosPrivate = useAxiosPrivate();

  const progress =
    (checklist?.items?.filter((item) => item.complete)?.length /
      checklist?.items?.length) *
      100 || 0;

  async function DeleteChecklist() {
    await axiosPrivate
      .post(`/checklist/remove`, { id: checklist?.id })
      .then((response) => {
        setCard({ ...card, checklists: [] });
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
    <div className="card_details_item">
      <div
        className="card_details_item_header"
        style={{ alignItems: editedChecklist.open ? "flex-start" : "center" }}
      >
        <div className="card_detail_title_icon">
          <i className="fa-regular fa-list-check"></i>
        </div>
        {editedChecklist.open && (
          <div style={{ width: "100%" }}>
            <Textarea
              value={editedChecklist.value}
              onChange={(e) =>
                setEditedChecklist({
                  ...editedChecklist,
                  value: e.target.value,
                })
              }
            />
            <div className="card_detail_form_actions">
              <button className="card_detail_form_save">Save</button>
              <button
                className="card_detail_form_close"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditedChecklist({ open: false, value: checklist?.title });
                }}
              >
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>
        )}
        {!editedChecklist.open && (
          <>
            <div
              className="card_detail_name"
              onClick={(e) => {
                e.stopPropagation();
                setEditedChecklist({ open: true, value: checklist?.title });
              }}
            >
              {checklist?.title}
            </div>
            <button
              className="card_detail_action_btn"
              onClick={DeleteChecklist}
            >
              Delete
            </button>
          </>
        )}
      </div>
      <div>
        <div className="card_detail_checklist_progress_wrapper">
          <div className="card_detail_checklist_progress">{progress}%</div>
          <div
            className="card_detail_checklist_progress_bar"
            style={{ "--progress": `${progress}%` }}
          />
        </div>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <ul
              className="card_detail_checklist_item_container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {checklist?.items.map((item, index) => (
                <CardChecklistItem
                  key={`checklist-item-${item.id}`}
                  item={item}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        {!item.open && (
          <button
            className="card_detail_checklist_add_item_btn"
            onClick={(e) => {
              e.stopPropagation();
              setItem({ open: true, value: "" });
            }}
          >
            Add an item
          </button>
        )}
        {item.open && (
          <div className="card_detail_form">
            <Textarea
              placeholder="Add an item"
              value={item.value}
              onChange={(e) => setItem({ ...item, value: e.target.value })}
            />
            <div className="card_detail_form_actions">
              <button className="card_detail_form_save">Add</button>
              <button
                className="card_detail_form_close"
                onClick={(e) => {
                  e.stopPropagation();
                  setItem({ open: false, value: "" });
                }}
              >
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CardComments = ({ card, setCard }) => {
  const { auth } = useAuth();

  return (
    <div className="card_details_item">
      <div className="card_details_item_header">
        <div className="card_detail_title_icon">
          <i className="fa-regular fa-comments"></i>
        </div>
        <div className="card_detail_name">Comments</div>
      </div>
      <div>
        <div className="card_detail_comment_field">
          <div className="card_comment_user">
            <img
              className="card_comment_user_image"
              src={auth?.user?.picturePath}
              alt="user"
            />
          </div>
          <input
            className="card_comment_input"
            placeholder="Write a comment..."
          />
        </div>
        <div className="card_detail_comments_list">
          {card?.comments?.map((comment) => (
            <div className="card_detail_comment">
              <div className="card_comment_user">
                <img
                  className="card_comment_user_image"
                  src={comment?.sender?.picturePath}
                  alt="user"
                />
              </div>
              <div className="card_comment_content">
                <div className="card_comment_info">
                  <div className="card_comment_username">
                    {comment?.sender?.username}
                  </div>
                  <div className="card_comment_time">
                    {FormatTime(comment?.sentAt)}
                  </div>
                </div>
                <div className="card_comment_msg">{comment?.message}</div>
                <div className="card_comment_actions">
                  <button className="card_comment_btn">Edit</button>-
                  <button className="card_comment_btn">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CardActions = ({ card, setCard }) => {
  const [checklistOpen, setChecklistOpen] = useState(false);
  const checklistRef = useRef(null);

  return (
    <div className="card_details_actions">
      <div className="card_detail_actions_module">
        <div className="card_detail_actions_module_title">Add to card</div>
        <button className="card_detail_action_btn">
          <i className="fa-regular fa-user"></i>
          Members
        </button>
        <button className="card_detail_action_btn">
          <i className="fa-regular fa-tag"></i>
          Labels
        </button>
        {card?.checklists?.length < 1 && (
          <button
            className="card_detail_action_btn"
            onClick={() => setChecklistOpen(true)}
            ref={checklistRef}
          >
            <i className="fa-regular fa-list-check"></i>
            Checklist
          </button>
        )}
      </div>
      <div className="card_detail_actions_module">
        <div className="card_detail_actions_module_title">Actions</div>
        <button className="card_detail_action_btn">
          <i className="fa-regular fa-arrow-right"></i>
          Move
        </button>
        <button className="card_detail_action_btn">
          <i className="fa-regular fa-box-archive"></i>
          Archive
        </button>
      </div>
      <ChecklistDropdown
        open={checklistOpen}
        anchor={checklistRef}
        onClose={() => setChecklistOpen(false)}
        card={card}
        setCard={setCard}
      />
    </div>
  );
};

const CardModal = ({ cardId, onClose }) => {
  const [card, setCard] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  function handleClose() {
    setCard(null);
    onClose();
  }

  async function GetCard() {
    await axiosPrivate
      .get(`/card/${cardId}`)
      .then((response) => {
        setCard(response.data);
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
    if (cardId != null) {
      GetCard();
    }
  }, [cardId]);

  return (
    <Modal open={card !== null} handleClose={handleClose} size="m">
      <div className="card_detail_modal">
        <header className="card_detail_modal_header">
          <div className="card_detail_title_icon">
            <i className="fa-regular fa-credit-card-front"></i>
          </div>
          <div className="card_detail_title">{card?.title}</div>
          <div className="card_detail_subtitle">in list ToDo</div>
          <button className="card_detail_close_btn" onClick={handleClose}>
            <i className="fa-regular fa-xmark"></i>
          </button>
        </header>
        <div className="card_detail_content">
          <div className="card_details">
            {card?.users?.length > 0 ||
              (card?.labels?.length > 0 && (
                <div className="card_details_header">
                  {card?.users?.length > 0 && (
                    <div className="card_details_header_item">
                      <div className="card_details_header_item_name">
                        Members
                      </div>
                      <div className="card_members_container">
                        {card?.users?.map((user) => (
                          <div className="card_member_wrapper">
                            {user?.picturePath ? (
                              <img
                                className="card_member"
                                src={user?.picturePath}
                                referrerPolicy="no-referrer"
                                alt="profile"
                              />
                            ) : (
                              <div className="card_member">
                                <i
                                  className={`fa-solid fa-${user.username.charAt()}`}
                                ></i>
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="card_member_wrapper add">
                          <div className="card_member">
                            <i className="fa-solid fa-plus"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {card?.labels?.length > 0 && (
                    <div className="card_details_header_item">
                      <div className="card_details_header_item_name">
                        Labels
                      </div>
                      <div className="card_labels_container">
                        {card?.labels?.map((label) => (
                          <div className="card_label">{label?.name}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            <CardDescription card={card} setCard={setCard} />
            <DragDropContext onDragEnd={() => {}}>
              <Droppable
                droppableId="board"
                type="checklist"
                direction="vertical"
              >
                {(provided) => (
                  <div
                    className="card_details_checklist_container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {card?.checklists?.map((checklist, index) => (
                      <CardChecklist
                        key={`checklist-${checklist.id}`}
                        checklist={checklist}
                        card={card}
                        setCard={setCard}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <CardComments card={card} setCard={setCard} />
          </div>
          <CardActions card={card} setCard={setCard} />
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
