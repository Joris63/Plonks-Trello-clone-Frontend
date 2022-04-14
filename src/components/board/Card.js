import { Draggable } from "react-beautiful-dnd";

const Card = () => {
  return (
    <Draggable draggableId={"card-1"} index={0}>
      {(provided, snapshot) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header className="card_header">UX Adjustments</header>
          <div className="card_content">
            <div className="card_labels_container">
              <div className="card_label">Research</div>
            </div>
            <div className="card_members_container">
              <div className="card_member_wrapper">
                <div className="card_member">
                  <i className="fa-regular fa-j"></i>
                </div>
              </div>
            </div>
          </div>
          <footer className="card_footer">
            <div className="card_footer_info">
              <i className="fa-regular fa-align-left"></i>
            </div>
            <div className="card_footer_info">
              <i className="fa-regular fa-comment"></i>2
            </div>
            <div className="card_footer_info">
              <i className="fa-regular fa-square-check"></i>
              0/2
            </div>
          </footer>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
