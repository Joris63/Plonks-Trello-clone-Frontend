import { useEffect, useRef, useState } from "react";
import "../../styles/common.scss";
import {
  CheckForCapsInString,
  CheckForNumberInString,
  CheckLengthInString,
} from "../../utils/helpers/validation.helpers";

const FormField = ({
  formName,
  field = {},
  handleChange,
  handleTouch,
  checkForWarning,
}) => {
  const [hidden, setHidden] = useState(field?.type === "password");
  const [warning, setWarning] = useState(() => checkForWarning(field));
  const [position, setPosition] = useState(null);

  const fieldRef = useRef(null);
  const hintBoxRef = useRef(null);

  useEffect(() => {
    setWarning(checkForWarning(field));
  }, [field]);

  function handleFocus() {
    if (field?.type !== "password") {
      return;
    }

    const inputRect = fieldRef.current.getBoundingClientRect();
    const hintBoxRect = hintBoxRef.current?.getBoundingClientRect();

    setPosition({
      x: inputRect.x + inputRect.width * 0.6,
      y: inputRect.y - hintBoxRect?.height - 16,
    });
  }

  function toggleHide() {
    setHidden(!hidden);
  }

  return (
    <div
      className={`form_field_wrapper form_input ${
        warning && field?.touched ? "error" : ""
      } ${field?.fullWidth ? "full_width" : ""}`}
    >
      <label
        className="form_field_label"
        htmlFor={`${formName}-field-input-${field?.name}`}
      >
        {field?.label}
      </label>
      {field.type === "password" &&
        (field?.minLength > 0 ||
          field?.requireLower ||
          field?.requireCaps ||
          field?.requiresNr) && (
          <div
            ref={hintBoxRef}
            style={
              position
                ? { left: position.x, top: position.y }
                : { visibility: "hidden", pointerEvents: "none" }
            }
            className="form_password_field_hints_wrapper"
          >
            <ul className="form_password_field_hints_list">
              {field?.minLength > 0 && (
                <li
                  className={`form_password_field_hint ${
                    CheckLengthInString(field?.value, field?.minLength)
                      ? "success"
                      : "error"
                  }`}
                >
                  At least {field.minLength} characters in length
                </li>
              )}
              {field?.requireLower && (
                <li
                  className={`form_password_field_hint ${
                    CheckForCapsInString(field?.value) ? "success" : "error"
                  }`}
                >
                  At least one lower case letter (a-z)
                </li>
              )}
              {field?.requiresCaps && (
                <li
                  className={`form_password_field_hint ${
                    CheckForCapsInString(field?.value) ? "success" : "error"
                  }`}
                >
                  At least one upper case letter (A-Z)
                </li>
              )}
              {field?.requiresNr && (
                <li
                  className={`form_password_field_hint ${
                    CheckForNumberInString(field?.value) ? "success" : "error"
                  }`}
                >
                  At least one number (i.e. 0-9)
                </li>
              )}
            </ul>
          </div>
        )}
      <div style={{ position: "relative" }}>
        <input
          ref={fieldRef}
          id={`${formName}-field-input-${field?.name}`}
          className="form_field"
          placeholder={field?.placeholder}
          type={
            field?.type !== "password" || (field?.type === "password" && hidden)
              ? field?.type
              : "text"
          }
          required={!field?.optional}
          value={field?.value}
          minLength={field?.minLength}
          maxLength={field?.maxLength}
          name={field?.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={() => {
            handleTouch(field?.name, true);
            setPosition(null);
          }}
        />
        {field?.type === "password" && (
          <div
            className={`form_field_toggle_hide ${hidden ? "hidden" : ""}`}
            onClick={toggleHide}
          />
        )}
      </div>
      {((warning &&
        document.activeElement !== fieldRef.current &&
        field?.touched) ||
        field?.hint) && (
        <small className="form_field_hint">{warning || field?.hint}</small>
      )}
    </div>
  );
};

export default FormField;
