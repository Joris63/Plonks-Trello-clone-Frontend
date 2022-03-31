import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FirePopup, FireToast } from "../../utils/helpers/toasts.helpers";
import ExternalLoginOptions from "./ExternalLoginOptions";
import Form from "../form/Form";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "../../api/axios";

const loginFields = [
  {
    label: "Email",
    placeholder: "yourname@example.com",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Your password",
  },
];

const LoginForm = ({ mode, toggleMode }) => {
  const [id, setId] = useState(`login-form-${uuidv4()}`);
  const [error, setError] = useState(null);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (mode === "login") {
      setId(`login-form-${uuidv4()}`);
      setError(null);
    }
  }, [mode]);

  async function handleSubmit(data) {
    await axios
      .post("/authenticate/login", data)
      .then((response) => {
        const result = response?.data;

        if (result.status === "Success") {
          const accessToken = result?.data;
          const { id, username, email, picture } = jwtDecode(accessToken);

          setAuth({ user: { id, username, email, picture }, accessToken });

          FirePopup("Welcome back!", null, "success", 1000);

          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else if (err.response?.status === 401) {
          setError("Incorrect email or password.");

          FireToast("Unauthorized.", "error");
        } else {
          FireToast("Something went wrong.", "error");
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

export default LoginForm;
