import React, { useEffect } from "react";

const DropDown = ({ title, open, toggleOpen, id, children }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const rect = document.getElementById(id)?.getBoundingClientRect();

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

    if (open) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [open, id, toggleOpen]);

  return open ? (
    <div className="dropdown" id={id}>
      <header>
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
