import { FormatTime } from "../../utils/helpers/common.helpers";
import Modal from "../helpers/Modal";
import moment from "moment";

const CardModal = () => {
  return (
    <Modal open={false} handleClose={() => {}}>
      <div className="card_detail_modal">
        <header className="card_detail_modal_header">
          <div className="card_detail_title_icon">
            <i className="fa-regular fa-credit-card-front"></i>
          </div>
          <div className="card_detail_title">Kaarten afmaken</div>
          <div className="card_detail_subtitle">in list ToDo</div>
          <button className="card_detail_close_btn">
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
            <div className="card_details_item">
              <div className="card_details_item_header">
                <div className="card_detail_title_icon">
                  <i className="fa-regular fa-align-left"></i>
                </div>
                <div className="card_detail_name">Description</div>
                <button className="card_detail_action_btn">Edit</button>
              </div>
              <div style={{ marginLeft: 40 }}>
                <div className="card_no_description">
                  No description added yet...
                </div>
              </div>
            </div>
            <div className="card_details_item">
              <div className="card_details_item_header">
                <div className="card_detail_title_icon">
                  <i className="fa-regular fa-list-check"></i>
                </div>
                <div className="card_detail_name">Checklist</div>
                <button className="card_detail_action_btn">Delete</button>
              </div>
              <div>
                <div className="card_detail_checklist_progress_wrapper">
                  <div className="card_detail_checklist_progress">100%</div>
                  <div
                    className="card_detail_checklist_progress_bar"
                    style={{ "--progress": "10%" }}
                  />
                </div>
                <ul className="card_detail_checklist_item_container">
                  <li className="card_detail_checklist_item">
                    <input
                      className="card_detail_checklist_item_checkbox"
                      id="card-checkbox-1"
                      type="checkbox"
                      value="value1"
                    />
                    <label
                      className="card_detail_checklist_item_name"
                      htmlFor="card-checkbox-1"
                    >
                      Checkbox
                    </label>
                    <button className="card_detail_checklist_item_btn">
                      <i className="fa-regular fa-ellipsis"></i>
                    </button>
                  </li>
                </ul>
                <button className="card_detail_checklist_add_item_btn">
                  Add an item
                </button>
              </div>
            </div>
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
                      src="https://preview.redd.it/v0caqchbtn741.jpg?auto=webp&s=c5d05662a039c031f50032e22a7c77dfcf1bfddc"
                      alt="user"
                    />
                  </div>
                  <input
                    className="card_comment_input"
                    placeholder="Write a comment..."
                  />
                </div>
                <div className="card_detail_comments_list">
                  <div className="card_detail_comment">
                    <div className="card_comment_user">
                      <img
                        className="card_comment_user_image"
                        src="https://preview.redd.it/v0caqchbtn741.jpg?auto=webp&s=c5d05662a039c031f50032e22a7c77dfcf1bfddc"
                        alt="user"
                      />
                    </div>
                    <div className="card_comment_content">
                      <div className="card_comment_info">
                        <div className="card_comment_username">JorisK</div>
                        <div className="card_comment_time">
                          {FormatTime(moment())}
                        </div>
                      </div>
                      <div className="card_comment_msg">Message</div>
                      <div className="card_comment_actions">
                        <button className="card_comment_btn">Edit</button>
                        -
                        <button className="card_comment_btn">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card_details_actions">
            <div className="card_detail_actions_module">
              <div className="card_detail_actions_module_title">
                Add to card
              </div>
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
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
