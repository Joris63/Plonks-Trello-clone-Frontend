import "../../styles/common.scss";
import FormField from "./FormField";

const Form = ({ fields }) => {
  return (
    <form className="form">
      {fields.map((field) => (
        <FormField key={`field-${field.name.replace(/\s/g, "")}`} {...field} />
      ))}
      <button className="save_form_btn">Save</button>
    </form>
  );
};

export default Form;
