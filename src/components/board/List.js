import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import Card from "./Card";

const List = () => {
  return (
    <Draggable draggableId={"list-1"} index={0}>
      {(provided, snapshot) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header className="list_header">
            <div>
              <div className="list_title">Todo</div>
              <div className="list_card_count">1</div>
            </div>
            <button className="list_option_btn">
              <i className="fa-regular fa-ellipsis-vertical"></i>
            </button>
          </header>
          <Droppable droppableId={"list-1"} type={"card"}>
            {(provided, snapshot) => (
              <div
                className="list_cards_container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Card />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
