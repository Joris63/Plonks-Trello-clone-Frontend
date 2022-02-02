import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const Card = ({ card, handleSort }) => {
  const ref = useRef(null);
  const dropRef = useRef();

  dropRef.current = { order: card.order, list_id: card.list_id };

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const { list_id, order } = dropRef.current;

      if (!ref.current) {
        return;
      }

      handleSort(item.id, list_id, order);

      item.order = order;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "card",
    item: () => {
      return { ...card };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(drop(ref));

  return (
    <div
      className="card"
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <p className="content">{card.content}</p>
    </div>
  );
};

export default Card;
