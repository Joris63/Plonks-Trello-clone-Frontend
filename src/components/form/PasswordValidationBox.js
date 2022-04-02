import { useLayoutEffect, useRef, useState } from "react";
import { IsElementOffscreen } from "../../utils/helpers/common.helpers";
import {
  CheckForLowercase,
  CheckForNumber,
  CheckForSymbols,
  CheckForUppercase,
  CheckMaxLength,
  CheckMinLength,
} from "../../utils/helpers/validation.helpers";

const PasswordValidationBox = ({ open, field, anchor }) => {
  const [position, setPosition] = useState(null);

  const hintBoxRef = useRef(null);

  useLayoutEffect(() => {
    function AdjustPosition() {
      const fieldRect = anchor?.current?.getBoundingClientRect();
      const hintRect = hintBoxRef?.current?.getBoundingClientRect();
      const isOffscreen = IsElementOffscreen(hintBoxRef.current);

      const adjustment = { ...position };

      if (isOffscreen.includes("right")) {
        console.log("right");
        console.log(fieldRect, hintRect);
        adjustment.x = fieldRect?.x + fieldRect?.width - hintRect?.width;
      }

      setPosition(adjustment);
    }

    function handlePositioning() {
      const fieldRect = anchor?.current?.getBoundingClientRect();
      const hintRect = hintBoxRef?.current?.getBoundingClientRect();

      setPosition({
        x: 0,
        y: fieldRect?.height + 16,
      });

      if (open) {
        //AdjustPosition();
      }
    }

    handlePositioning();

    if (open) {
      window.addEventListener("scroll", handlePositioning);
    }

    return () => {
      window.removeEventListener("scroll", handlePositioning);
    };
  }, [anchor, open]);

  return (
    <div
      ref={hintBoxRef}
      style={
        open
          ? { left: position.x + "px", bottom: position.y + "px" }
          : { visibility: "hidden", pointerEvents: "none" }
      }
      className="form_password_field_hints_wrapper"
    >
      <ul className="form_password_field_hints_list">
        {field?.minLength && (
          <li
            className={`form_password_field_hint ${
              CheckMinLength(field?.value, field?.minLength)
                ? "success"
                : "error"
            }`}
          >
            At least {field.minLength} characters in length
          </li>
        )}
        {field?.maxLength && (
          <li
            className={`form_password_field_hint ${
              CheckMaxLength(field?.value, field?.minLength)
                ? "success"
                : "error"
            }`}
          >
            No longer than {field.maxLength} characters in length
          </li>
        )}
        {field?.requiresLower && (
          <li
            className={`form_password_field_hint ${
              CheckForLowercase(field?.value) ? "success" : "error"
            }`}
          >
            At least one lower case letter (a-z)
          </li>
        )}
        {field?.requiresUpper && (
          <li
            className={`form_password_field_hint ${
              CheckForUppercase(field?.value) ? "success" : "error"
            }`}
          >
            At least one upper case letter (A-Z)
          </li>
        )}
        {field?.requiresNr && (
          <li
            className={`form_password_field_hint ${
              CheckForNumber(field?.value) ? "success" : "error"
            }`}
          >
            At least one number (i.e. 0-9)
          </li>
        )}
        {field?.requiresSymbol && (
          <li
            className={`form_password_field_hint ${
              CheckForSymbols(field?.value) ? "success" : "error"
            }`}
          >
            At least one special symbol (i.e. !@#$%)
          </li>
        )}
      </ul>
    </div>
  );
};

export default PasswordValidationBox;
