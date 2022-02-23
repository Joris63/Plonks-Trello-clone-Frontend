import React from "react";
import ActionsList from "./ActionsList";
import ActivityField from "./ActivityField";
import ChecklistField from "./ChecklistField";
import DescriptionField from "./DescriptionField";

const CardModalContent = (props) => {
  return (
    <>
      <div className="main_content">
        <DescriptionField {...props} />
        {props?.card?.checklists?.map((checklist) => (
          <ChecklistField checklist={checklist} {...props} />
        ))}
        <ActivityField {...props} />
      </div>
      <ActionsList />
    </>
  );
};

export default CardModalContent;
