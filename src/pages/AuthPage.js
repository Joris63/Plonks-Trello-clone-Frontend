import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "../components/form/Form";
import jwt from "jwt-decode"; // import dependency
import "../styles/pages.scss";

import { ReactComponent as SrcumBoard } from "../assets/scrum_board.svg";
import { Login, Register, SocialLogin } from "../services/AuthService";
import { FirePopup, FireToast } from "../utils/helpers/toasts.helpers";
import GoogleLogin from "react-google-login";

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

const ExternalLoginOptions = () => {
  function handleGoogleResponse(response) {
    const { profileObj: profile } = response;
    const data = {
      username: profile.name,
      email: profile.email,
      password: profile.googleId,
      picturePath: profile.imageUrl,
    };

    SocialLogin(data).then((result) => {
      if (!result.success) {
        FireToast("Sign in failed", "error");
      } else {
        console.log(result.message);
        const message =
          result.message === "registered" ? "Welcome!" : "Welcome back!";

        FirePopup(message, null, "success", 1500);
      }
    });
  }

  return (
    <div className="external_login_options">
      <GoogleLogin
        clientId="831239906317-3ehjmd84e52gsvcren9aqfu9ami0r5au.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className="gooogle_btn auth_submit_btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              className="external_icon_svg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt=""
            />
            <div>Sign in with Google</div>
          </button>
        )}
        onSuccess={handleGoogleResponse}
        onFailure={handleGoogleResponse}
        cookiePolicy={"single_host_origin"}
      />
      <div className="external_options_seperator">or Sign in with Email</div>
    </div>
  );
};

const LoginForm = ({ mode, toggleMode }) => {
  const [id, setId] = useState(`login-form-${uuidv4()}`);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode === "login") {
      setId(`login-form-${uuidv4()}`);
      setError(null);
    }
  }, [mode]);

  function handleSubmit(data) {
    Login(data).then((result) => {
      if (!result.success) {
        setError(result.message);

        FireToast("Sign in failed", "error");
      } else {
        FirePopup("Welcome back!", null, "success", 1500);
      }
    });
  }

  return (
    <div className="auth_form_wrapper login_wrapper" id="login">
      <div className="auth_form_content">
        <div className="auth_form_title">Sign in</div>
        <ExternalLoginOptions />
        {error && <div className="auth_form_error">{error}</div>}
        <Form
          id={id}
          formName="login"
          fields={loginFields}
          buttonProps={{ text: "Sign in", class: "auth_submit_btn" }}
          onSubmit={handleSubmit}
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

const RegisterForm = ({ mode, toggleMode }) => {
  const [id, setId] = useState(`register-form-${uuidv4()}`);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode === "register") {
      setId(`register-form-${uuidv4()}`);
      setError(null);
    }
  }, [mode]);

  function handleSubmit(data) {
    Register(data).then((result) => {
      if (!result.success) {
        setError(result.message);

        FireToast("Registration failed", "error");
      } else {
        FirePopup("Welcome!", result.message, "success", 1500);
      }
    });
  }

  return (
    <div className="auth_form_wrapper register_wrapper" id="register">
      <div className="auth_form_content">
        <div className="auth_form_title">
          Create
          <br /> an account
        </div>
        <ExternalLoginOptions />
        {error && <div className="auth_form_error">{error}</div>}
        <Form
          id={id}
          formName="register"
          fields={registerFields}
          buttonProps={{ text: "Create an account", class: "auth_submit_btn" }}
          onSubmit={handleSubmit}
        />
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

const AuthPage = () => {
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
        <LoginForm mode={mode} toggleMode={toggleMode} />
        <RegisterForm mode={mode} toggleMode={toggleMode} />
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
