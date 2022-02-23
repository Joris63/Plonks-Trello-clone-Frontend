import _ from "lodash";
import React, { useEffect, useState } from "react";

const DropDown = ({
  title,
  open,
  position,
  mode = "default",
  handleMode,
  handleClose,
  id,
  children,
}) => {
  const [rect, setRect] = useState({});

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !(
          e.clientX > rect?.left &&
          e.clientX < rect?.right &&
          e.clientY > rect?.top &&
          e.clientY < rect?.bottom
        )
      ) {
        handleClose();
      }
    };

    const newRect = document.getElementById(id)?.getBoundingClientRect();
    const updatedRect = {
      left: newRect?.left,
      right: newRect?.right,
      top: newRect?.top,
      bottom: newRect?.bottom,
    };

    if (open && !_.isEqual(rect, updatedRect)) {
      setRect(updatedRect);
    }

    if (open) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [open, rect, id, handleClose]);

  return open ? (
    <div
      id={id}
      className="dropdown"
      style={{ top: (position?.y || 0) + 40, left: (position?.x || 0) + 10 }}
    >
      <header>
        {mode !== "default" && (
          <button className="back_btn" onClick={() => handleMode("default")}>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
        )}
        <p className="dropdown_title">{title}</p>
        <button className="close_btn" onClick={handleClose}>
          <ion-icon name="add-outline"></ion-icon>
        </button>
      </header>
      <hr />
      {children}
    </div>
  ) : null;
};

export default DropDown;
