import { useLayoutEffect, useRef, useState } from "react";
import { IsElementOffscreen } from "../../utils/helpers/common.helpers";

let justOpened = false;
let openedBefore = false;

const Dropdown = ({ open, anchor, offset, handleClose, children }) => {
  const [position, setPosition] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const dropdownRef = useRef(null);

  useLayoutEffect(() => {
    const dropdownRect = dropdownRef?.current?.getBoundingClientRect();
    setDimensions({ height: dropdownRect.height, width: dropdownRect.width });

    return () => {
      openedBefore = false;
    };
  }, []);

  useLayoutEffect(() => {
    function AdjustPosition() {
      const anchorRect = anchor?.current?.getBoundingClientRect();

      if (!openedBefore) {
        openedBefore = true;
      }

      const adjustment = {
        x: anchorRect?.x + (offset?.x || 0),
        y: anchorRect?.y + (offset?.y || 0),
      };

      const isOffscreen = IsElementOffscreen(dimensions, adjustment);

      if (isOffscreen.includes("left")) {
        adjustment.x = 8;
      }

      if (isOffscreen.includes("right")) {
        adjustment.x = window.innerWidth - (dimensions.width + 8);
      }

      if (isOffscreen.includes("up")) {
        adjustment.y = 8;
      }

      if (isOffscreen.includes("down")) {
        adjustment.y = window.innerHeight - (dimensions.height + 8);
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
      if (!open) {
        return;
      }

      AdjustPosition();

      justOpened = true;
      setTimeout(() => (justOpened = false), 200);
    }

    if (open) {
      handlePositioning();

      document.addEventListener("click", handleClick);
      window.addEventListener("resize", handlePositioning);
    } else {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handlePositioning);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handlePositioning);
    };
  }, [anchor, open]);

  return (
    <div
      ref={dropdownRef}
      style={{
        top: position?.y,
        left: position?.x,
        visibility: openedBefore ? "visible" : "hidden",
      }}
      className="dropdown_wrapper"
    >
      <div
        className={`dropdown animate__animated ${
          !open || !position ? "animate__zoomOut hidden" : "animate__zoomIn"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
