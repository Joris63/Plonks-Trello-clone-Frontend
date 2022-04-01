import { useEffect, useRef, useState } from "react";
import { ReactComponent as ScrumBoard } from "../assets/scrum_board.svg";
import LoginForm from "../components/auth/Login";
import RegisterForm from "../components/auth/Register";
import "../styles/pages.scss";

function getLoginFormHeight() {
  const rect = document
    .getElementsByClassName("login_wrapper")[0]
    ?.getBoundingClientRect();

  return rect?.height;
}

const AuthPage = () => {
  const [loginFormHeight, setLoginFormHeight] = useState(getLoginFormHeight());
  const [mode, setMode] = useState("login");

  useEffect(() => {
    function handleResize() {
      setLoginFormHeight(getLoginFormHeight());
    }

    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  }, []);

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
        <LoginForm mode={mode} toggleMode={toggleMode} />
        <RegisterForm mode={mode} toggleMode={toggleMode} />
      </div>
      <div
        className={`auth_overlay ${mode}`}
        style={
          mode === "register"
            ? { height: loginFormHeight }
            : { top: loginFormHeight }
        }
      >
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
            <ScrumBoard className="auth_info_svg" />
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
            <ScrumBoard className="auth_info_svg" />
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
