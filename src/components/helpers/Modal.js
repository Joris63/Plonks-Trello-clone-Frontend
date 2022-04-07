const Modal = ({ open = true }) => {
  return (
    <div className={`modal_overlay animate__animated ${open ? "animate__fadeIn" : "animate__fadeOut"}`}>
      <div className={`modal ${open ? "animate__bounceIn" : "animate__bounceOut"}`}>

      </div>
    </div>
  );
};

export default Modal;
