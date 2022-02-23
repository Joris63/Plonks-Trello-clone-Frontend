import React, { useEffect, useState } from "react";

const Modal = ({ title, subtitle, open, onClose, children }) => {
  const [status, setStatus] = useState(true);

  const handleClick = (e) => {
    if (e.target === document.getElementById("modal-overlay")) {
      handleClose();
    }
  };

  const handleClose = () => {
    setStatus(false);

    setTimeout(() => {
      onClose();
      setStatus(true);
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
      className={`modal_overlay animate__animated ${
        status ? "animate__fadeIn" : "animate__fadeOut"
      }`}
    >
      <div
        className={`modal animate__animated ${
          status ? "animate__zoomIn" : "animate__zoomOut animate__slow"
        }`}
      >
        <div className="modal_title">
          <ion-icon className="icon" name="card-outline" />
          <div className="modal_header">
            <p className="modal_name">{title}</p>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="close_modal_btn" onClick={() => handleClose()}>
            <ion-icon name="add-outline" />
          </button>
        </div>
        <div className="modal_content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;