import { useState } from "react";

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

export default NotificationSettings;
