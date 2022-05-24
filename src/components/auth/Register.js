import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { FirePopup, FireToast } from "../../helpers/toasts.helpers";
import Form from "../form/Form";
import ExternalLoginOptions from "./ExternalLoginOptions";

const registerFields = [
  {
    label: "Username",
    placeholder: "John Doe",
  },
  {
    label: "Email",
    type: "email",
    placeholder: "yourname@example.com",
  },
  {
    label: "Password",
    type: "password",
    requiresLower: true,
    requiresUpper: true,
    requiresNr: true,
    requiresSymbol: true,
    minLength: 8,
    placeholder: "Your password",
  },
];

const RegisterForm = ({ mode, toggleMode }) => {
  const [id, setId] = useState(`register-form-${uuidv4()}`);
  const [error, setError] = useState(null);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (mode === "register") {
      setId(`register-form-${uuidv4()}`);
      setError(null);
    }
  }, [mode]);

  async function handleSubmit(data) {
    await axios
      .post("/auth/register", data)
      .then((response) => {
        const { id, username, email, picturePath, socialLogin, accessToken } =
          response?.data;

        setAuth({
          user: { id, username, email, picturePath, socialLogin },
          accessToken,
        });

        FirePopup("Welcome!", null, "success", 1000);

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((err) => {
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else if (err.response?.status === 400) {
          setError(err?.response?.data.message);

          FireToast("Registration failed.", "error");
        } else {
          FireToast("Something went wrong.", "error");
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

export default RegisterForm;
