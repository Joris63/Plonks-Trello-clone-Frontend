import { useEffect, useState } from "react";
import CustomSelect from "../form/CustomSelect";

const filterOptions = [
  { name: "Most recently active", abbr: "activity-desc", active: true },
  { name: "Last recently active", abbr: "activity-asc" },
  { name: "Alphabetically A-Z", abbr: "alphabet-asc" },
  { name: "Alphabetically Z-A", abbr: "alphabet-desc" },
];

const BoardsFilter = ({ handleSort }) => {
  const [options, setOptions] = useState(filterOptions);

  function handleChange(option) {
    const updatedOptions = options.map((child) => {
      if (option === child.abbr) {
        return { ...child, active: true };
      } else {
        return { ...child, active: false };
      }
    });

    setOptions(updatedOptions);
  }

  useEffect(() => {
    handleSort(options.find((option) => option.active).abbr);
  }, [options]);

  return (
    <div className="board_filter_wrapper">
      <label className="board_filter_wrapper_label">Sort by</label>
      <div className="board_filter_select">
        <CustomSelect
          name="board-select"
          options={options}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BoardsFilter;
