import _ from "lodash";
import React, { useState } from "react";
import ChecklistItem from "./CheckListItem";

const ChecklistField = ({ checklist, card, handleSave }) => {
  const [adding, setAdding] = useState(false);

  const percentage =
    checklist?.items?.items?.filter((item) => item.complete)?.length /
    checklist?.items?.items.length;

  const handleChecklistSave = (checklistItem) => {
    const checklists = _.cloneDeep(card?.checklists);
    const updatedList = _.cloneDeep(checklist?.items) || [];
    const itemIndex = updatedList?.findIndex(
      (item) => item.id === checklistItem.id
    );

    if (itemIndex !== -1) {
      updatedList?.splice(itemIndex, 1, checklistItem);
    } else {
      updatedList.push(checklistItem);
    }

    const listIndex = checklists.findIndex((list) => list.id === checklist.id);

    checklists.splice(listIndex, 1, updatedList);

    handleSave({ ...card, checklists });
  };

  return (
    <div className="checklist">
      <div className="title">
        <ion-icon className="icon" name="checkbox-outline" />
        <div className="main">
          <p className="name">{checklist?.name}</p>
        </div>
        <button className="text_button edit">Delete</button>
      </div>
      <div className="content">
        <div className="progress_bar">
          <p className="percentage">{`${percentage || 0}%`}</p>
          <div className="bar">
            <div
              className="progress"
              style={{ width: `${percentage || 0}%` }}
            ></div>
          </div>
        </div>
        <div className="item_list">
          {checklist?.items?.map((item) => (
            <ChecklistItem item={item} onSave={handleChecklistSave} />
          ))}
          {adding && (
            <ChecklistItem
              onSave={handleChecklistSave}
              handleCancel={() => setAdding(false)}
            />
          )}
        </div>
        <button
          className="text_button add_item"
          onClick={() => setAdding(true)}
        >
          Add an item
        </button>
      </div>
    </div>
  );
};

export default ChecklistField;
