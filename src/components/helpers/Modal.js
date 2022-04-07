import { useEffect, useRef } from "react";

let justOpened = false;

const Modal = ({ open = true, handleClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        e.target !== modalRef?.current &&
        !modalRef?.current?.contains(e.target) &&
        !justOpened
      ) {
        handleClose();
      }
    }

    if (open) {
      justOpened = true;
      setTimeout(() => (justOpened = false), 200);

      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <div
      className={`modal_overlay animate__animated ${
        open ? "animate__fadeIn" : "hidden animate__fadeOut"
      }`}
    >
      <div
        ref={modalRef}
        className={`modal ${open ? "animate__zoomIn" : "animate__zoomOut"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
