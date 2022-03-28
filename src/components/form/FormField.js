import { useEffect, useState } from "react";
import "../../styles/common.scss";

const FormField = ({
  formName,
  field = {},
  handleChange,
  handleTouch,
  checkForWarning,
}) => {
  const [hidden, setHidden] = useState(field?.type === "password");
  const [warning, setWarning] = useState(() => checkForWarning(field));

  useEffect(() => {
    setWarning(checkForWarning(field));
  }, [field]);

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
      <div style={{ position: "relative" }}>
        <input
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
          onBlur={() => handleTouch(field?.name, true)}
        />
        {field?.type === "password" && (
          <div
            className={`form_field_toggle_hide ${hidden ? "hidden" : ""}`}
            onClick={toggleHide}
          />
        )}
      </div>
      {((warning && field?.touched) || field?.hint) && (
        <small className="form_field_hint">{warning || field?.hint}</small>
      )}
    </div>
  );
};

export default FormField;
