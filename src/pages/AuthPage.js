import { useState } from "react";
import Form from "../components/form/Form";
import "../styles/pages.scss";

import { ReactComponent as SrcumBoard } from "../assets/scrum_board.svg";

const loginFields = [
  {
    label: "Username/Email",
  },
  {
    label: "Password",
    type: "password",
  },
];

const registerFields = [
  {
    label: "Username",
  },
  {
    label: "Full name",
  },
  {
    label: "Email",
    type: "email",
  },
  {
    label: "Password",
    type: "password",
    requiresCaps: true,
    requiresNr: true,
    minLength: 8,
  },
];

const AuthSubmitButton = ({ text, handleSubmit }) => {
  return (
    <button className="auth_submit_btn" onClick={handleSubmit}>
      {text}
    </button>
  );
};

const AuthPage = (props) => {
  const [mode, setMode] = useState("login");

  function toggleMode() {
    if (mode === "login") {
      setMode("register");
    } else {
      setMode("login");
    }
  }

  return (
    <div className="container">
      <div className="auth_app_title">
        <div className="auth_app_logo">
          <i className="fa-duotone fa-square-kanban"></i>
        </div>
        <div className="auth_app_name">Plonks</div>
      </div>
      <div className="login_wrapper auth_form_wrapper">
        <div className="auth_form_content">
          <div className="auth_form_title">Sign in</div>
          <Form formName="login" fields={loginFields}>
            <div className="auth_form_forgot_password">Forgot password?</div>
            <AuthSubmitButton text="Sign in" />
          </Form>
          <div className="auth_form_extra_opts">
            Don't have an account?
            <div className="auth_form_extra_btn" onClick={toggleMode}>
              Create one
            </div>
          </div>
        </div>
      </div>
      <div className="register_wrapper auth_form_wrapper">
        <div className="auth_form_content">
          <div className="auth_form_title">
            Create
            <br /> an account
          </div>
          <Form formName="register" fields={registerFields}>
            <AuthSubmitButton text="Create an account" />
          </Form>
          <div className="auth_form_extra_opts">
            Already have an account?
            <div className="auth_form_extra_btn" onClick={toggleMode}>
              Sign in
            </div>
          </div>
        </div>
      </div>
      <div className={`auth_overlay ${mode}`}>
        <div className="auth_overlay_content">
          <div className="auth_app_title alternate">
            <div className="auth_app_logo">
              <i className="fa-solid fa-square-kanban"></i>
            </div>
            <div className="auth_app_name">Plonks</div>
          </div>
          <div
            className={`auth_info_wrapper login ${
              mode === "register" ? "active" : ""
            }`}
          >
            <SrcumBoard className="auth_info_svg" />
            <div className="auth_info_text">
              Increase your teams productivity.
            </div>
            <div className="auth_info_sub_text">
              Collaborate, manage projects, and reach new productivity peaks.
            </div>
          </div>
          <div
            className={`auth_info_wrapper register ${
              mode === "login" ? "active" : ""
            }`}
          >
            <SrcumBoard className="auth_info_svg" />
            <div className="auth_info_text">
              Increase your teams productivity.
            </div>
            <div className="auth_info_sub_text">
              Collaborate, manage projects, and reach new productivity peaks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
