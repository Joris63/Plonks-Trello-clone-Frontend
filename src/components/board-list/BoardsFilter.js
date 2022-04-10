import { useEffect, useState } from "react";
import CustomSelect from "../helpers/CustomSelect";

const filterOptions = [
  { name: "Most recently active", abbr: "activity-desc", active: true },
  { name: "Last recently active", abbr: "activity-asc" },
  { name: "Alphabetically A-Z", abbr: "alphabet-asc" },
  { name: "Alphabetically Z-A", abbr: "alphabet-desc" },
];

const BoardsFilter = ({ handleSort }) => {
  const [options, setOptions] = useState(filterOptions);

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
          onChange={setOptions}
        />
      </div>
    </div>
  );
};

export default BoardsFilter;
