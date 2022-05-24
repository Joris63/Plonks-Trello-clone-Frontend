import {
  CheckForLowercase,
  CheckForNumber,
  CheckForSymbols,
  CheckForUppercase,
  CheckMaxLength,
  CheckMinLength,
} from "../../helpers/validation.helpers";

const PasswordValidationBox = ({ open, field }) => {
  return (
    <div
      className={`form_password_field_hints_wrapper animate__animated ${
        open ? "animate__zoomIn" : "animate__zoomOut hidden"
      }`}
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
