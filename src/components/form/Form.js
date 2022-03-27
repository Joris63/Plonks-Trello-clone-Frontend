import { useCallback, useEffect, useState } from "react";
import "../../styles/common.scss";
import {
  TurnStringToCamelCase,
  ValidateEmail,
} from "../../utils/helpers/common";
import FormField from "./FormField";
import {
  CheckForBadCharacters,
  CheckForCapsInString,
  CheckForNumberInString,
  CheckLengthInString,
} from "../../utils/helpers/common";

const Form = ({
  formName,
  children,
  fields = [],
  buttonProps = { text: "Save", class: "save_form_btn" },
  onSubmit,
}) => {
  const [state, setState] = useState(setInitialState());
  const [ready, setReady] = useState(true);

  const checkForWarning = useCallback(
    (field) => {
      const value =
        state[field?.name] || state[TurnStringToCamelCase(field.label)];

      if (value === "" && !field?.optional) {
        return "Field is required.";
      }

      if (field?.requiresNr && !CheckForNumberInString(value)) {
        return "Must contain at least one number.";
      }

      if (field?.requiresCaps && !CheckForCapsInString(value)) {
        return "Must contain at least one uppercase letter";
      }

      if (field?.type === "email" && !ValidateEmail(value)) {
        return `Must be a valid email.`;
      }

      if (!CheckLengthInString(value, field?.minLength)) {
        return `Must be at least ${field?.minLength} characters long.`;
      }

      if (field?.type === "password" && CheckForBadCharacters(value)) {
        return "Must not contain quotes or spaces.";
      }

      return null;
    },
    [state]
  );

  useEffect(() => {
    setReady(
      fields.some((field) => typeof checkForWarning(field) === "string")
    );
  }, [state]);

  function setInitialState() {
    const result = {};

    fields.forEach((field) => {
      const fieldName = TurnStringToCamelCase(field.label);

      result[fieldName] = field.value || "";
    });

    return result;
  }

  function handleChange(e) {
    const name = e.target.name;
    const newValue = e.target.value;

    setState({ ...state, [name]: newValue });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(state);
  }

  if (fields.length < 1) {
    return null;
  }

  return (
    <form className="form">
      {fields.map((field) => {
        const name = TurnStringToCamelCase(field.label);
        const updatedField = {
          name,
          value: "",
          fullWidth: true,
          placeholder: "",
          optional: false,
          unique: false,
          requiresNr: false,
          requiresCaps: false,
          type: "text",
          minLength: 0,
          ...field,
        };

        return (
          <FormField
            key={`field-${name}`}
            formName={formName}
            field={updatedField}
            name={name}
            value={state[name]}
            handleChange={handleChange}
            checkForWarning={checkForWarning}
          />
        );
      })}
      {children && children}
      <button
        disabled={ready}
        type="submit"
        className={buttonProps.class}
        onClick={handleSubmit}
      >
        {buttonProps.text}
      </button>
    </form>
  );
};

export default Form;
