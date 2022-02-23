import React from "react";

const ActionsList = (props) => {
  return (
    <div className="modal_actions_list">
      <div className="modal_actions_module">
        <p className="modal_actions_module_title">Add to card</p>
        <ul className="modal_actions_module_list">
          <li className="modal_action">
            <button className="icon_text_button">
              <ion-icon name="person-outline" />
              <p>Members</p>
            </button>
          </li>
          <li className="modal_action">
            <button className="icon_text_button">
              <ion-icon name="pricetag-outline" />
              <p>Labels</p>
            </button>
          </li>
          <li className="modal_action">
            <button className="icon_text_button">
              <ion-icon name="checkbox-outline" />
              <p>Checkist</p>
            </button>
          </li>
        </ul>
      </div>
      <div className="modal_actions_module">
        <p className="modal_actions_module_title">Actions</p>
        <ul className="modal_actions_module_list">
          <li className="modal_action">
            <button className="icon_text_button">
              <ion-icon name="arrow-forward-outline" />
              <p>Move</p>
            </button>
          </li>
          <li className="modal_action">
            <button className="icon_text_button">
              <ion-icon name="card-outline" />
              <p>Make template</p>
            </button>
          </li>
          <li>
            <hr />
          </li>
          <li className="modal_action">
            <button className="icon_text_button">
              <ion-icon name="archive-outline" />
              <p>Archive</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionsList;
