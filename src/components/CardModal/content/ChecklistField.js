import React from "react";
import ChecklistItem from "./CheckListItem";

const ChecklistField = ({ checklist, card }) => {
  return (
    <div className="checklist">
      <div className="title">
        <ion-icon className="icon" name="checkbox-outline" />
        <div className="main">
          <p className="name">Checklist</p>
        </div>
        <button className="text_button edit">Delete</button>
      </div>
      <div className="content">
        <div className="progress_bar">
          <p className="percentage">50%</p>
          <div className="bar">
            <div className="progress"></div>
          </div>
        </div>
        <div className="item_list">
          {card?.checklist?.map((item) => {
            <ChecklistItem />;
          })}
          <ChecklistItem />
        </div>
        <button className="text_button add_item">Add an item</button>
      </div>
    </div>
  );
};

export default ChecklistField;
