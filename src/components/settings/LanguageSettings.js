import { useState } from "react";

import { ReactComponent as USFlag } from "../../assets/us-flag.svg";
import { ReactComponent as NLFlag } from "../../assets/nl-flag.svg";
import { ReactComponent as FRFlag } from "../../assets/fr-flag.svg";

const languageOptions = [
  { abbr: "en", name: "English", flag: <USFlag /> },
  { abbr: "nl", name: "Nederlands", flag: <NLFlag /> },
  { abbr: "fr", name: "Français", flag: <FRFlag /> },
];

const LanguageSettings = (props) => {
  const [mode, setMode] = useState("en");

  return (
    <div className="app_settings_wrapper">
      <div className="form_title">Language</div>
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <div className="form_subtitle">Select a language</div>
        {languageOptions.map((language, index) => (
          <label
            key={`language-selector-${language.abbr}-${index}`}
            className={`app_setting_selector ${
              language.abbr === mode ? "active" : ""
            }`}
            htmlFor={`${language.abbr}-language`}
          >
            <div className="setting_info">
              <input
                className="setting_radio_input"
                type="radio"
                name="language"
                checked={language.abbr === mode}
                id={`${language.abbr}-language`}
                onChange={() => setMode(language.abbr)}
              />
              <div className="setting_radio_btn"></div>
              <div className="setting_name">{language.name}</div>
            </div>
            <div className="language_flag">{language.flag}</div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LanguageSettings;
