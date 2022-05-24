const Textarea = ({ value, onChange, placeholder }) => {
  function autoGrow(e) {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  }
  return (
    <textarea
      placeholder={placeholder}
      className="textarea"
      onInput={autoGrow}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
