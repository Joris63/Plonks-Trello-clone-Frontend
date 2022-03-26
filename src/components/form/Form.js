import { useEffect, useState } from "react";
import "../../styles/common.scss";
import { TurnStringToCamelCase } from "../../utils/helpers/common";
import FormField from "./FormField";

const Form = ({ fields }) => {
  const [state, setState] = useState(setInitialState());

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

  return (
    <form className="form">
      {fields.map((field) => {
        const name = TurnStringToCamelCase(field.label);

        return (
          <FormField
            key={`field-${name}`}
            name={name}
            value={state[name]}
            handleChange={handleChange}
            {...field}
          />
        );
      })}
      <button className="save_form_btn">Save</button>
    </form>
  );
};

export default Form;
