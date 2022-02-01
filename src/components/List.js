import React, { useCallback, useEffect, useState } from "react";
import Card from "./Card";

const List = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleDropdown = useCallback((e) => {
    const rect = document
      .getElementById(`action_drpdwn-${id}`)
      ?.getBoundingClientRect();

    if (
      rect &&
      !(
        e.clientX > rect.left &&
        e.clientX < rect.right &&
        e.clientY > rect.top &&
        e.clientY < rect.bottom
      )
    ) {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (open) {
      window.addEventListener("click", handleDropdown);
    } else {
      window.removeEventListener("click", handleDropdown);
    }

    return () => window.removeEventListener("click", handleDropdown);
  }, [open]);

  return (
    <div className="list">
      <header>
        <p className="name">Concept</p>
        <div className="action">
          <button className="action_btn" onClick={() => setOpen(!open)}>
            <ion-icon name="ellipsis-horizontal" />
          </button>
          {open && (
            <div className="action_dropdown" id={`action_drpdwn-${id}`}>
              <header>
                <p className="title">List actions</p>
                <button className="close_btn" onClick={() => setOpen(!open)}>
                  <ion-icon name="add-outline"></ion-icon>
                </button>
              </header>
              <hr />
            </div>
          )}
        </div>
      </header>
      <ul className="card_container">
        <Card />
        <Card />
        <Card />
        <Card />
      </ul>
      <footer>
        <button className="add_card">
          <ion-icon name="add-sharp" />
          <p>Add a card</p>
        </button>
      </footer>
    </div>
  );
};

export default List;
