import "../../styles/common.scss";

const FormField = ({
  fullWidth = true,
  name,
  hint,
  optional = false,
  unique = false,
  requiresNr = false,
  requiresCaps = false,
  email = false,
  password = false,
  minLength = 0,
  maxlength,
}) => {
  let inputType = "text";

  if (password) {
    inputType = "password";
  }

  if (email) {
    inputType = "email";
  }

  return (
    <div
      className={`form_field_wrapper form_input ${
        fullWidth ? "full_width" : ""
      }`}
    >
      <label
        className="form_field_label"
        htmlFor={`field-${name.replace(/\s/g, "")}`}
      >
        {name}
      </label>
      <input
        id={`field-${name.replace(/\s/g, "")}`}
        className="form_field"
        placeholder={name}
        type={inputType}
        required={!optional}
      />
      <small className="form_field_hint">{hint}</small>
    </div>
  );
};

export default FormField;
