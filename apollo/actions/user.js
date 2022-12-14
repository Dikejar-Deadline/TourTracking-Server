const axios = require("axios");
const { errorAxios } = require("../errorHandling/axiosError");
const userUrl = `${process.env.SERVICE2}/auth`;

const registerAction = async (_, args) => {
  try {
    const form = ({
      firstName,
      lastName,
      picture,
      username,
      email,
      phoneNumber,
      address,
      password,
      role,
    } = args);
    const { data } = await axios.post(userUrl + "/register", form);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
  }
};

const loginAction = async (_, { email, password }) => {
  try {
    const { data } = await axios.post(userUrl + "/login", { email, password });
    return { access_token: data.access_token };
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
  }
};

const getUser = async (_, args, context) => {
  try {
    const { data } = await axios.get(userUrl + "/by-token", context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
  }
};

const getAllUser = async (_, args, context) => {
  try {
    const { data } = await axios.get(userUrl + "/user", context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
  }
};

module.exports = { loginAction, registerAction, getUser, getAllUser };
