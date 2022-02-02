import React, { useEffect, useRef } from "react";

const Card = ({ card, handleSort }) => {
  return (
    <div className="card">
      <p className="content">{card.content}</p>
    </div>
  );
};

export default Card;
