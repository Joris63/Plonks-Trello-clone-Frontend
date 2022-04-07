import { useEffect, useLayoutEffect, useRef, useState } from "react";

let justOpened = false;

const Modal = ({ open = false, handleClose, children }) => {
  const [openedBefore, setOpenedBefore] = useState(false);
  const modalRef = useRef(null);

  useLayoutEffect(() => {
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
      setOpenedBefore(true);

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
      style={{
        visibility: openedBefore ? "visible" : "hidden",
      }}
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
