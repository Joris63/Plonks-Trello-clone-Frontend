import Modal from "../helpers/Modal";

const CardModal = () => {
  return (
    <Modal open={true} handleClose={() => {}}>
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
                  <div className="card_member_wrapper">
                    <div className="card_member">
                      <i className="fa-regular fa-j"></i>
                    </div>
                  </div>
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
                  <i class="fa-regular fa-align-left"></i>
                </div>
                <div className="card_detail_name">Description</div>
              </div>
            </div>
            <div className="card_details_item">
              <div className="card_details_item_header">
                <div className="card_detail_title_icon">
                  <i class="fa-regular fa-square-check"></i>
                </div>
                <div className="card_detail_name">Checklist</div>
              </div>
            </div>
            <div className="card_details_item">
              <div className="card_details_item_header">
                <div className="card_detail_title_icon">
                  <i class="fa-regular fa-comments"></i>
                </div>
                <div className="card_detail_name">Comments</div>
              </div>
            </div>
          </div>
          <div className="card_details_actions"></div>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
