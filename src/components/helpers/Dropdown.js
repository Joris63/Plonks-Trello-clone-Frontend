import { useLayoutEffect, useRef, useState } from "react";
import { IsElementOffscreen } from "../../utils/helpers/common";
import "animate.css";
import "../../styles/common.scss";

let justOpened = false;

const Dropdown = ({ open, anchor, handleClose }) => {
  const [position, setPosition] = useState(null);
  const dropdownRef = useRef(null);

  useLayoutEffect(() => {
    function AdjustPosition() {
      const rect = dropdownRef?.current?.getBoundingClientRect();
      const isOffscreen = IsElementOffscreen(dropdownRef.current);

      const adjustment = { ...position };

      if (isOffscreen.includes("left")) {
        adjustment.x = 8;
      }

      if (isOffscreen.includes("right")) {
        adjustment.x = window.innerWidth - (rect.width + 8);
      }

      if (isOffscreen.includes("up")) {
        adjustment.y = 8;
      }

      if (isOffscreen.includes("down")) {
        adjustment.y = window.innerHeight - (rect.height + 8);
      }

      setPosition(adjustment);
    }

    function handleClick(e) {
      if (
        e.target !== dropdownRef?.current &&
        !dropdownRef?.current?.contains(e.target) &&
        !justOpened
      ) {
        handleClose();
      }
    }

    function handlePositioning() {
      const rect = anchor?.current?.getBoundingClientRect();

      setPosition({ x: rect?.x, y: rect?.y + 55 });

      if (open) {
        justOpened = true;
        setTimeout(() => (justOpened = false), 200);
        AdjustPosition();
      }
    }

    handlePositioning();

    if (open) {
      document.addEventListener("click", handleClick);
      window.addEventListener("resize", handlePositioning);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handlePositioning);
    };
  }, [anchor, open]);

  if (!open || !position) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      style={{ top: position.y, left: position.x }}
      className="dropdown"
    >
      <ul className="dropdown_actions_list">
        <li className="dropdown_action_wrapper">
          <button className="dropdown_action">
            <i className="dropdown_action_icon fa-solid fa-gear"></i>
            Settings
          </button>
        </li>
        <li className="dropdown_action_wrapper">
          <button className="dropdown_action">
            <i className="dropdown_action_icon fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
