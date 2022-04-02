import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import FormField from "./FormField";
import { CheckField } from "../../utils/helpers/validation.helpers";
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
      CheckField(field);
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
      value: field.value || "",
      fullWidth: true,
      placeholder: "",
      optional: false,
      unique: false,
      requiresNr: false,
      RequiresUpper: false,
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

    const data = Object.fromEntries(
      allFields.map((field) => [field?.name, field?.value])
    );

    onSubmit(data);
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
