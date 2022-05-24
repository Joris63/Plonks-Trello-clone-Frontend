import GoogleLogin from "react-google-login";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { FirePopup, FireToast } from "../../helpers/toasts.helpers";

const ExternalLoginOptions = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function handleGoogleResponse(response) {
    const { profileObj: profile } = response;
    const data = {
      username: profile.name,
      email: profile.email,
      password: profile.googleId,
      picturePath: profile.imageUrl,
    };

    await axios
      .post("auth/social-login", data)
      .then((response) => {
        const {
          id,
          username,
          email,
          picturePath,
          socialLogin,
          accessToken,
          message,
        } = response?.data;

        setAuth({
          user: { id, username, email, picturePath, socialLogin },
          accessToken,
        });

        FirePopup(
          message === "signedIn" ? "Welcome back!" : "Welcome!",
          null,
          "success",
          1000
        );

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((err) => {
        if (!err?.response) {
          FireToast("No server response.", "error");
        } else {
          FireToast("Something went wrong.", "error");
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

export default ExternalLoginOptions;
