import Form from "../components/form/Form";
import LanguageSettings from "../components/settings/LanguageSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import ThemeSettings from "../components/settings/ThemeSettings";
import useAuth from "../hooks/useAuth";
import { FireToast } from "../helpers/toasts.helpers";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import axios from "axios";

const passwordFields = [
  {
    label: "New password",
    type: "password",
    fullWidth: false,
    requiresLower: true,
    requiresUpper: true,
    requiresNr: true,
    requiresSymbol: true,
    minLength: 8,
  },
  {
    label: "Old password",
    type: "password",
    fullWidth: false,
  },
];

const SettingsPage = (props) => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [profilePicPath, setProfilePicPath] = useState(
    auth?.user?.picturePath || null
  );

  const basicFields = [
    {
      label: "Username",
      value: auth?.user?.username,
    },
    {
      label: "Email",
      type: "email",
      unique: true,
      value: auth?.user?.email,
      disabled: auth?.user?.socialLogin || false,
    },
  ];

  async function handleImageUpload(e) {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: "Client-ID 289b5b31fd643f5",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setProfilePicPath(response.data.link);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUserInfoSubmit(data) {
    if (
      data.username === auth?.user?.username &&
      data.email === auth?.user?.email
    ) {
      return;
    }

    await axiosPrivate
      .post("/user/edit", {
        id: auth?.user?.id,
        username: data.username,
        email: auth?.user?.socialLogin ? null : data.email,
        picturePath: profilePicPath || null,
      })
      .then((response) => {
        const { id, username, email, picturePath, socialLogin, message } =
          response?.data;

        setAuth({
          user: { id, username, email, picturePath, socialLogin },
        });

        FireToast(message, "success");
      })
      .catch((err) => {
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else if (err.response?.status === 400) {
          FireToast(err?.response?.data, "error");
        } else {
          FireToast("Something went wrong.", "error");
        }
      });
  }
  async function handleChangePwdSubmit(data) {
    await axiosPrivate
      .post("/user/edit-password", { ...data, id: auth?.user?.id })
      .then((response) => {
        const { id, username, email, picturePath, socialLogin, message } =
          response?.data;

        setAuth({
          user: { id, username, email, picturePath, socialLogin },
        });

        FireToast(message, "success");
      })
      .catch((err) => {
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else if (err.response?.status === 400) {
          FireToast(err?.response?.data, "error");
        } else {
          FireToast("Something went wrong.", "error");
        }
      });
  }

  return (
    <div className="page_content">
      <div className="page_title">Account & Settings</div>
      <div className="settings_wrapper">
        <div className="user_profile_wrapper">
          <div className="app_settings_wrapper">
            <div className="form_title">My Account</div>
            <div className="user_profile_picture_wrapper">
              <label htmlFor="profile-pic-input">
                {!profilePicPath ? (
                  <div className="user_profile_picture">
                    <i
                      className={`fa-solid fa-${auth?.user?.username?.charAt()}`}
                    ></i>
                    <div className="user_profile_picture_edit">
                      <i className="fa-solid fa-pen"></i>
                    </div>
                  </div>
                ) : (
                  <div className="user_profile_picture">
                    <img
                      className="user_profile_picture"
                      src={profilePicPath}
                      alt="profile"
                      referrerPolicy="no-referrer"
                    />
                    <div className="user_profile_picture_edit">
                      <i className="fa-solid fa-pen"></i>
                    </div>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="profile-pic-input"
                className="user_profile_picture_input"
                onChange={handleImageUpload}
              />
            </div>
            <Form
              formName="user-info"
              fields={basicFields}
              onSubmit={handleUserInfoSubmit}
            />
          </div>
          {!auth?.user?.socialLogin && (
            <div className="app_settings_wrapper">
              <div className="form_title">Security</div>
              <Form
                formName="change-pwd"
                fields={passwordFields}
                onSubmit={handleChangePwdSubmit}
              />
            </div>
          )}
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
