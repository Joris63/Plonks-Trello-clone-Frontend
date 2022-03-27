const axios = require("axios");

const baseHeader = { "Access-Control-Allow-Origin": "*" };

async function Login(data) {
  try {
    const response = await axios.post(
      "https://localhost:7072/api/account/login",
      data,
      baseHeader
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

async function Register(data) {
  try {
    const response = await axios.post(
      "https://localhost:7072/api/account/register",
      data,
      baseHeader
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export { Login, Register };
