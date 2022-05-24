import { useState } from "react";

const themeOptions = [
  { abbr: "light", name: "Light mode" },
  { abbr: "dark", name: "Dark mode" },
];

const ThemeSettings = (props) => {
  const [mode, setMode] = useState("light");

  return (
    <div className="app_settings_wrapper">
      <div className="form_title">Theme</div>
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <div className="form_subtitle">Select a theme</div>
        {themeOptions.map((theme, index) => (
          <label
            key={`language-selector-${theme.abbr}-${index}`}
            className={`app_setting_selector ${
              theme.abbr === mode ? "active" : ""
            }`}
            htmlFor={`${theme.abbr}-theme`}
          >
            <div className="setting_info">
              <input
                className="setting_radio_input"
                type="radio"
                name="theme"
                checked={theme.abbr === mode}
                id={`${theme.abbr}-theme`}
                onChange={() => setMode(theme.abbr)}
              />
              <div className="setting_radio_btn"></div>
              <div className="setting_name">{theme.name}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ThemeSettings;
