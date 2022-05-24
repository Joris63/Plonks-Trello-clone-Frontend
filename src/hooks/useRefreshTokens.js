import jwtDecode from "jwt-decode";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    return await axios
      .post(`auth/refresh-token`, {
        withCredentials: true,
      })
      .then((response) => {
        const { accessToken } = response?.data;

        setAuth((prev) => {
          const { id, username, email, picturePath, socialLogin } =
            jwtDecode(accessToken);

          return {
            ...prev,
            user: {
              id,
              username,
              email,
              picturePath,
              socialLogin: socialLogin.toLowerCase() === "true",
            },
            accessToken: accessToken,
          };
        });

        return accessToken;
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
