import _ from "lodash";
import React, { useEffect, useState } from "react";

const DropDown = ({
  title,
  open,
  mode,
  handleMode,
  toggleOpen,
  id,
  children,
}) => {
  const [rect, setRect] = useState({});

  useEffect(() => {
    const handleOutsideClick = (e) => {
      console.log(e.clientX, e.clientY, rect);

      if (
        !(
          e.clientX > rect?.left &&
          e.clientX < rect?.right &&
          e.clientY > rect?.top &&
          e.clientY < rect?.bottom
        )
      ) {
        toggleOpen();
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
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [open, rect, id, toggleOpen]);

  return open ? (
    <div className="dropdown" id={id}>
      <header>
        {mode !== "default" && (
          <button className="back_btn" onClick={() => handleMode("default")}>
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
        )}
        <p className="title">{title}</p>
        <button className="close_btn" onClick={toggleOpen}>
          <ion-icon name="add-outline"></ion-icon>
        </button>
      </header>
      <hr />
      {children}
    </div>
  ) : null;
};

export default DropDown;
