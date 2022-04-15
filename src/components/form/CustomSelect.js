import { useEffect, useRef, useState } from "react";

const justOpened = false;

const CustomSelect = ({ name, options, onChange }) => {
  const [open, setOpen] = useState(false);

  const optionsRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        e.target !== optionsRef?.current &&
        !optionsRef?.current?.contains(e.target) &&
        !justOpened
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  return (
    <div
      className={`select ${open ? "active" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <span className="select_selection">
        {options.find((option) => option.active)?.name}
      </span>
      <ul ref={optionsRef} className="select_options_list">
        {options.map((option) => (
          <li
            key={`${name}-option-${option?.abbr}`}
            className="select_option"
            onClick={() => onChange(option.abbr)}
          >
            {option?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
