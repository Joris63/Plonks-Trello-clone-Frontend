import { useEffect, useState } from "react";
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

const LoginForm = ({ toggleMode }) => {
  return (
    <div className="auth_form_wrapper login_wrapper" id="login">
      <div className="auth_form_content">
        <div className="auth_form_title">Sign in</div>
        <Form
          formName="login"
          fields={loginFields}
          buttonProps={{ text: "Sign in", class: "auth_submit_btn" }}
        >
          <div className="auth_form_forgot_password">Forgot password?</div>
        </Form>
        <div className="auth_form_extra_opts">
          Don't have an account?
          <div className="auth_form_extra_btn" onClick={toggleMode}>
            Create one
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterForm = ({ toggleMode }) => {
  return (
    <div className="auth_form_wrapper register_wrapper" id="register">
      <div className="auth_form_content">
        <div className="auth_form_title">
          Create
          <br /> an account
        </div>
        <Form
          formName="register"
          fields={registerFields}
          buttonProps={{ text: "Create an account", class: "auth_submit_btn" }}
        ></Form>
        <div className="auth_form_extra_opts">
          Already have an account?
          <div className="auth_form_extra_btn" onClick={toggleMode}>
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthPage = (props) => {
  const [mode, setMode] = useState("login");

  useEffect(() => {
    document.getElementById(mode).scrollIntoView();
  }, [mode]);

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
      <div className="auth_page_wrapper">
        <LoginForm toggleMode={toggleMode} />
        <RegisterForm toggleMode={toggleMode} />
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
