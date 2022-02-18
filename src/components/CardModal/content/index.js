import React from "react";
import ActionsList from "./ActionsList";
import ActivityField from "./ActivityField";
import ChecklistField from "./ChecklistField";
import DescriptionField from "./DescriptionField";

const CardModalContent = (props) => {
  const { card } = props;

  return (
    <>
      <div className="main_content">
        <DescriptionField {...props} />
        {card?.checklist && <ChecklistField {...props} />}
        <ActivityField {...props} />
      </div>
      <ActionsList />
    </>
  );
};

export default CardModalContent;
