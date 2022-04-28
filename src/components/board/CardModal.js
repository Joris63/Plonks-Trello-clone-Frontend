import { FormatTime } from "../../utils/helpers/common.helpers";
import Modal from "../helpers/Modal";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import useAuth from "../../hooks/useAuth";

const CardDescription = ({ card }) => {
  return (
    <div className="card_details_item">
      <div className="card_details_item_header">
        <div className="card_detail_title_icon">
          <i className="fa-regular fa-align-left"></i>
        </div>
        <div className="card_detail_name">Description</div>
        <button className="card_detail_action_btn">Edit</button>
      </div>
      <div style={{ marginLeft: 40 }}>
        {(card?.description === "" || !card?.description) && (
          <div className="card_no_description">No description added yet...</div>
        )}
      </div>
    </div>
  );
};

const CardChecklistItem = ({ item, index }) => {
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

const CardChecklist = ({ checklist, index }) => {
  const progress =
    (checklist?.items?.filter((item) => item.complete)?.length /
      checklist?.items?.length) *
    100;

  return (
    <Draggable draggableId={checklist?.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card_details_item"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="card_details_item_header">
            <div className="card_detail_title_icon">
              <i className="fa-regular fa-list-check"></i>
            </div>
            <div className="card_detail_name">{checklist?.title}</div>
            <button className="card_detail_action_btn">Delete</button>
          </div>
          <div>
            <div className="card_detail_checklist_progress_wrapper">
              <div className="card_detail_checklist_progress">{progress}%</div>
              <div
                className="card_detail_checklist_progress_bar"
                style={{ "--progress": "10%" }}
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
                    <CardChecklistItem item={item} index={index} />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <button className="card_detail_checklist_add_item_btn">
              Add an item
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const CardComments = ({ card }) => {
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

const CardActions = () => {
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
        <button className="card_detail_action_btn">
          <i className="fa-regular fa-list-check"></i>
          Checklist
        </button>
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
    </div>
  );
};

const CardModal = ({ cardId, handleClose }) => {
  const [card, setCard] = useState(null);

  return (
    <Modal open={cardId !== null} handleClose={handleClose} size="m">
      <div className="card_detail_modal">
        <header className="card_detail_modal_header">
          <div className="card_detail_title_icon">
            <i className="fa-regular fa-credit-card-front"></i>
          </div>
          <div className="card_detail_title">Kaarten afmaken</div>
          <div className="card_detail_subtitle">in list ToDo</div>
          <button className="card_detail_close_btn" onClick={handleClose}>
            <i className="fa-regular fa-xmark"></i>
          </button>
        </header>
        <div className="card_detail_content">
          <div className="card_details">
            <div className="card_details_header">
              <div className="card_details_header_item">
                <div className="card_details_header_item_name">Members</div>
                <div className="card_members_container">
                  <div className="card_member_wrapper add">
                    <div className="card_member">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card_details_header_item">
                <div className="card_details_header_item_name">Labels</div>
                <div className="card_labels_container">
                  <div className="card_label">Label</div>
                </div>
              </div>
            </div>
            <CardDescription />
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
                      <CardChecklist checklist={checklist} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <CardComments />
          </div>
          <CardActions />
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
