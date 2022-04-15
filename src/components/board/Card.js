import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  const customDragStyle = (style) => {
    if (!style?.transform) {
      return style;
    }

    let xAdjustment = parseInt(
      style.transform.slice(
        style.transform.indexOf("(") + 1,
        style.transform.indexOf(",") - 2
      )
    );

    let yAdjustment = parseInt(
      style.transform.slice(
        style.transform.indexOf(",") + 1,
        style.transform.indexOf(")") - 2
      )
    );

    if (xAdjustment < 0) {
      xAdjustment = 0;
    }

    if (yAdjustment < 0) {
      yAdjustment = 0;
    }

    return {
      ...style,
      transform: `translate(${xAdjustment}px, ${yAdjustment}px)`,
    };
  };

  return (
    <Draggable draggableId={card?.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={customDragStyle(provided.draggableProps.style)}
        >
          <header className="card_header">{card?.title}</header>
          <div className="card_content">
            <div className="card_labels_container">
              {card?.labels?.map((label) => (
                <div className="card_label">{label.name}</div>
              ))}
            </div>
            <div className="card_members_container">
              {card?.members?.map((member) => (
                <div className="card_member_wrapper">
                  <div className="card_member">
                    <i className="fa-regular fa-j"></i>
                  </div>
                </div>
              ))}
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
