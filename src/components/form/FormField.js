import { useEffect, useState } from "react";
import "../../styles/common.scss";
import {
  CheckForBadCharacters,
  CheckForCapsInString,
  CheckForNumberInString,
  CheckLengthInString,
} from "../../utils/helpers/common";

const FormField = ({
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
  const [touched, setTouched] = useState(false);
  const [warning, setWarning] = useState(() => checkForWarning(value));

  useEffect(() => {
    setWarning(checkForWarning(value));
  }, [value]);

  function checkForWarning(string) {
    if (requiresNr && !CheckForNumberInString(string)) {
      return label + " must contain at least one number.";
    }

    if (requiresCaps && !CheckForCapsInString(string)) {
      return label + " must contain at least one uppercase letter";
    }

    if (!CheckLengthInString(string, minLength)) {
      return label + " must be at least 8 characters long.";
    }

    if (type === "password" && CheckForBadCharacters(string)) {
      return label + " must not contain quotes or spaces.";
    }

    return null;
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
      <input
        id={`field-${name}`}
        className="form_field"
        placeholder={placeholder}
        type={type}
        required={!optional}
        value={value}
        minLength={minLength}
        maxLength={maxlength}
        name={name}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
      />
      {((warning && touched) || hint) && (
        <small className="form_field_hint">{warning || hint}</small>
      )}
    </div>
  );
};

export default FormField;
