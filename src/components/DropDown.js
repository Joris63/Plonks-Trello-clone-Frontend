import React, { useEffect } from "react";

const DropDown = ({ open, handleClose, id, children }) => {
  useEffect(() => {
    const handleDropdown = (e) => {
      const rect = document.getElementById(id)?.getBoundingClientRect();

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

    if (open) {
      window.addEventListener("click", handleDropdown);
    } else {
      window.removeEventListener("click", handleDropdown);
    }

    return () => window.removeEventListener("click", handleDropdown);
  }, [open, id, handleClose]);

  return open ? (
    <div className="dropdown" id={id}>
      {children}
    </div>
  ) : null;
};

export default DropDown;
