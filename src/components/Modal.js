import React, { useEffect, useState } from "react";
import "animate.css";

const Modal = ({ title, subtitle, open, onClose, children }) => {
  const [animation, setAnimation] = useState("fadeIn");

  const handleClick = (e) => {
    if (e.target === document.getElementById("modal-overlay")) {
      handleClose();
    }
  };

  const handleClose = () => {
    setAnimation("fadeOut");

    setTimeout(() => {
      onClose();
      setAnimation("fadeIn");
    }, 325);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      id="modal-overlay"
      className={`modal_overlay animate__animated animate__${animation}`}
    >
      <div className="modal animate__animated animate__zoomIn">
        <div className="title">
          <ion-icon className="icon" name="card-outline" />
          <div className="main">
            <p className="name">{title}</p>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="cancel" onClick={() => handleClose()}>
            <ion-icon name="add-outline" />
          </button>
        </div>
        <div className="modal_content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
