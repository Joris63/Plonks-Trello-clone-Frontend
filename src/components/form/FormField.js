import { useEffect, useState } from "react";
import "../../styles/common.scss";
import {
  CheckForBadCharacters,
  CheckForCapsInString,
  CheckForNumberInString,
  CheckLengthInString,
} from "../../utils/helpers/common";

const FormField = ({
  formName,
  name = "",
  value = "",
  handleChange,
  fullWidth = true,
  label,
  placeholder = "",
  hint,
  optional = false,
  unique = false,
  requiresNr = false,
  requiresCaps = false,
  type = "text",
  minLength = 0,
  maxlength,
}) => {
  const [hidden, setHidden] = useState(type === "password");
  const [touched, setTouched] = useState(false);
  const [warning, setWarning] = useState(() => checkForWarning(value));

  useEffect(() => {
    setWarning(checkForWarning(value));
  }, [value]);

  function checkForWarning(string) {
    if (value === "" && !optional) {
      return "Field is required.";
    }

    if (requiresNr && !CheckForNumberInString(string)) {
      return "Must contain at least one number.";
    }

    if (requiresCaps && !CheckForCapsInString(string)) {
      return "Must contain at least one uppercase letter";
    }

    if (!CheckLengthInString(string, minLength)) {
      return "Must be at least 8 characters long.";
    }

    if (type === "password" && CheckForBadCharacters(string)) {
      return "Must not contain quotes or spaces.";
    }

    return null;
  }

  function toggleHide() {
    setHidden(!hidden);
  }

  return (
    <div
      className={`form_field_wrapper form_input ${
        warning && touched ? "error" : ""
      } ${fullWidth ? "full_width" : ""}`}
    >
      <label className="form_field_label" htmlFor={`field-${name}`}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={`${formName}-field-${name}`}
          className="form_field"
          placeholder={placeholder}
          type={
            type !== "password" || (type === "password" && !hidden)
              ? type
              : "text"
          }
          required={!optional}
          value={value}
          minLength={minLength}
          maxLength={maxlength}
          name={name}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
        {type === "password" && (
          <div
            className={`form_field_toggle_hide ${hidden ? "hidden" : ""}`}
            onClick={toggleHide}
          />
        )}
      </div>
      {((warning && touched) || hint) && (
        <small className="form_field_hint">{warning || hint}</small>
      )}
    </div>
  );
};

export default FormField;
