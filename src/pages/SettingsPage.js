import Form from "../components/form/Form";
import { useState } from "react";
import "../styles/common.scss";
import "../styles/pages.scss";

import { ReactComponent as USFlag } from "../assets/us-flag.svg";
import { ReactComponent as NLFlag } from "../assets/nl-flag.svg";
import { ReactComponent as FRFlag } from "../assets/fr-flag.svg";

const basicFields = [
  {
    label: "Full name",
  },
  {
    label: "Username",
    unique: true,
  },
  {
    label: "Email",
    type: "email",
    unique: true,
  },
];

const passwordFields = [
  {
    label: "New password",
    requiresCaps: true,
    requiresNr: true,
    minLength: 8,
    type: "password",
    fullWidth: false,
  },
  {
    label: "Old password",
    type: "password",
    fullWidth: false,
  },
];

const notificationSettings = [
  {
    name: "Enable Unseen Activity Badge",
    description:
      "Shows a red badge on the items where you have unseen changes.",
    active: true,
  },
  {
    name: "Communication Emails",
    description: "Receive emails for board invitations and team invitations.",
    active: true,
  },
  {
    name: "Social Emails",
    description: "Receive emails events in your boards.",
    active: true,
  },
];

const languageOptions = [
  { abbr: "en", name: "English", flag: <USFlag /> },
  { abbr: "nl", name: "Nederlands", flag: <NLFlag /> },
  { abbr: "fr", name: "Français", flag: <FRFlag /> },
];

const themeOptions = [
  { abbr: "light", name: "Light mode" },
  { abbr: "dark", name: "Dark mode" },
];

const NotificationSettings = (props) => {
  const [settings, setSettings] = useState(notificationSettings);

  return (
    <div className="app_settings_wrapper">
      <div className="form_title">Notifications</div>
      <div style={{ marginBottom: 8, marginTop: 16 }}>
        {settings.map((setting, index) => (
          <div key={`notif-setting-${index}`} className="app_setting_wrapper">
            <div className="app_setting_info">
              <div className="app_setting_title">{setting.name}</div>
              <div className="app_setting_description">
                {setting.description}
              </div>
            </div>
            <div className="checkbox_wrapper">
              <label
                className="checkbox_switch"
                htmlFor={`notif-setting-${index}`}
              >
                <input
                  checked={setting.active}
                  type="checkbox"
                  className="slider_input"
                  id={`notif-setting-${index}`}
                  onChange={() => setSettings([])}
                />
                <div className="checkbox_slider round"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

const SettingsPage = (props) => {
  return (
    <div className="page_content">
      <div className="page_title">Account & Settings</div>
      <div className="settings_wrapper">
        <div className="user_profile_wrapper">
          <div className="app_settings_wrapper">
            <div className="form_title">My Account</div>
            <div className="user_profile_picture_wrapper">
              <div className="user_profile_picture">
                <i className="fa-solid fa-j"></i>
                <div className="user_profile_picture_edit">
                  <i className="fa-solid fa-pen"></i>
                </div>
              </div>
            </div>
            <Form fields={basicFields} />
          </div>
          <div className="app_settings_wrapper">
            <div className="form_title">Security</div>
            <Form fields={passwordFields} />
          </div>
        </div>
        <div className="app_settings_wrapper">
          <NotificationSettings />
          <LanguageSettings />
          <ThemeSettings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;