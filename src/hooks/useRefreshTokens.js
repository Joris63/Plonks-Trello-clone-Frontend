import jwtDecode from "jwt-decode";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const oldRefreshToken = window.localStorage.getItem("refreshToken");

    return await axios
      .post(
        `auth/refresh-token`,
        { refreshToken: oldRefreshToken },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const { accessToken, refreshToken } = response?.data;

        window.localStorage.setItem("refreshToken", refreshToken);

        setAuth((prev) => {
          const { id, username, email, picturePath } = jwtDecode(accessToken);

          return {
            ...prev,
            user: { id, username, email, picturePath },
            accessToken: accessToken,
          };
        });
      })
      .catch((err) => {
        if (!err?.response) {
          console.log("No server response.");
        } else if (err.response?.status === 400) {
          console.log(err?.response?.data);
        } else {
          console.log("Something went wrong.");
        }
      });
  };

  return refresh;
};

export default useRefreshToken;
