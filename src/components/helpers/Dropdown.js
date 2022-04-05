import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IsElementOffscreen } from "../../utils/helpers/common.helpers";
import "../../styles/common.scss";

let justOpened = false;
let openedBefore = false;

const Dropdown = ({ open, anchor, handleClose, children }) => {
  const [position, setPosition] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    return () => {
      openedBefore = false;
    };
  }, []);

  useLayoutEffect(() => {
    function AdjustPosition() {
      const anchorRect = anchor?.current?.getBoundingClientRect();
      const dropdownRect = dropdownRef?.current?.getBoundingClientRect();

      const dropdownWidth = openedBefore
        ? dropdownRect.width * (10 / 3)
        : dropdownRect.width;
      const dropdownHeight = openedBefore
        ? dropdownRect.height * (10 / 3)
        : dropdownRect.height;

      if (!openedBefore) {
        openedBefore = true;
      }

      const adjustment = { x: anchorRect?.x, y: anchorRect?.y + 55 };

      const isOffscreen = IsElementOffscreen(
        { height: dropdownHeight, width: dropdownWidth },
        adjustment
      );

      if (isOffscreen.includes("left")) {
        adjustment.x = 8;
      }

      if (isOffscreen.includes("right")) {
        adjustment.x = window.innerWidth - (dropdownWidth + 8);
      }

      if (isOffscreen.includes("up")) {
        adjustment.y = 8;
      }

      if (isOffscreen.includes("down")) {
        adjustment.y = window.innerHeight - (dropdownHeight + 8);
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
      className={`dropdown animate__animated ${
        !open || !position ? "animate__zoomOut hidden" : "animate__zoomIn"
      }`}
    >
      {children}
    </div>
  );
};

export default Dropdown;
