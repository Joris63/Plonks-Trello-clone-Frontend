import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import FormField from "./FormField";
import {
  CheckForBadCharacters,
  CheckForCapsInString,
  CheckForNumberInString,
  CheckLengthInString,
  ValidateEmail,
} from "../../utils/helpers/validation.helpers";
import { TurnStringToCamelCase } from "../../utils/helpers/common.helpers";
import "../../styles/common.scss";

const Form = ({
  id,
  formName,
  children,
  fields = [],
  buttonProps = { text: "Save", class: "save_form_btn" },
  onSubmit,
}) => {
  const [allFields, setAllFields] = useState(setInitialState());
  const [ready, setReady] = useState(true);

  const checkForWarning = useCallback(
    (field) => {
      if (field?.value === "" && !field?.optional) {
        return "Field is required.";
      }

      if (field?.requiresNr && !CheckForNumberInString(field?.value)) {
        return "Must contain at least one number.";
      }

      if (field?.requiresCaps && !CheckForCapsInString(field?.value)) {
        return "Must contain at least one uppercase letter";
      }

      if (field?.type === "email" && !ValidateEmail(field?.value)) {
        return `Must be a valid email.`;
      }

      if (!CheckLengthInString(field?.value, field?.minLength)) {
        return `Must be at least ${field?.minLength} characters long.`;
      }

      if (field?.type === "password" && CheckForBadCharacters(field?.value)) {
        return "Must not contain quotes or spaces.";
      }

      return null;
    },
    [allFields]
  );

  useEffect(() => {
    handleReset();
  }, [id]);

  useEffect(() => {
    setReady(
      allFields?.some((field) => typeof checkForWarning(field) === "string")
    );
  }, [allFields]);

  function setInitialState() {
    return fields.map((field) => ({
      name: TurnStringToCamelCase(field.label),
      value: "",
      fullWidth: true,
      placeholder: "",
      optional: false,
      unique: false,
      requiresNr: false,
      requiresCaps: false,
      type: "text",
      minLength: 0,
      touched: false,
      ...field,
    }));
  }

  function handleReset() {
    setAllFields(setInitialState());
  }

  function handleChange(e) {
    const name = e.target.name;
    const newValue = e.target.value;
    const updatedFields = _.cloneDeep(allFields);
    const field = updatedFields.find((field) => field.name === name);

    field.value = newValue;

    setAllFields(updatedFields);
  }

  function handleTouch(name, touched) {
    const updatedFields = _.cloneDeep(allFields);
    const field = updatedFields.find((field) => field.name === name);

    field.touched = touched;

    setAllFields(updatedFields);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(allFields);
  }

  if (fields.length < 1) {
    return null;
  }

  return (
    <form className="form">
      {allFields.map((field) => (
        <FormField
          key={`field-${field?.name}`}
          formName={formName}
          field={field}
          handleChange={handleChange}
          handleTouch={handleTouch}
          checkForWarning={checkForWarning}
        />
      ))}
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
