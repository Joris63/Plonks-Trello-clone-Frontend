const axios = require("axios");

const baseHeader = { "Access-Control-Allow-Origin": "*" };

function Login(data) {
  return axios
    .post("https://localhost:7072/api/account/login", data, baseHeader)
    .then((response) => {
      if (response.data) {
        const { token, success, ...rest } = response.data;

        if (success) {
          sessionStorage.setItem("user", JSON.stringify(token));
        }

        return { success, ...rest };
      } else {
        return response;
      }
    });
}

function SocialLogin(data) {
  return axios
    .post("https://localhost:7072/api/account/socialLogin", data, baseHeader)
    .then((response) => {
      if (response.data) {
        const { token, success, ...rest } = response.data;

        if (success) {
          sessionStorage.setItem("user", JSON.stringify(token));
        }

        return { success, ...rest };
      } else {
        return response;
      }
    });
}

function Register(data) {
  return axios
    .post("https://localhost:7072/api/account/register", data, baseHeader)
    .then((response) => {
      if (response.data) {
        const { token, success, ...rest } = response.data;

        if (success) {
          sessionStorage.setItem("user", JSON.stringify(token));
        }

        return { success, ...rest };
      } else {
        return response;
      }
    });
}

export { Login, SocialLogin, Register };
