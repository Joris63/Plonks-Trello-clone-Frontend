import React from "react";

const ActionsList = (props) => {
  return (
    <div className="actions_list">
      <div className="module">
        <p className="module_title">Add to card</p>
        <ul className="module_list">
          <li className="module_action">
            <button className="icon_text_button">
              <ion-icon name="person-outline" />
              <p>Members</p>
            </button>
          </li>
          <li className="module_action">
            <button className="icon_text_button">
              <ion-icon name="pricetag-outline" />
              <p>Labels</p>
            </button>
          </li>
          <li className="module_action">
            <button className="icon_text_button">
              <ion-icon name="checkbox-outline" />
              <p>Checkist</p>
            </button>
          </li>
        </ul>
      </div>
      <div className="module">
        <p className="module_title">Actions</p>
        <ul className="module_list">
          <li className="module_action">
            <button className="icon_text_button">
              <ion-icon name="arrow-forward-outline" />
              <p>Move</p>
            </button>
          </li>
          <li className="module_action">
            <button className="icon_text_button">
              <ion-icon name="card-outline" />
              <p>Make template</p>
            </button>
          </li>
          <li>
            <hr />
          </li>
          <li className="module_action">
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
