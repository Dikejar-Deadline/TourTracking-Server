const { default: axios, AxiosError } = require("axios");
const { errorAxios } = require("../errorHandling/axiosError");
const userUrl = "http://localhost:4000";

const getAllUser = async (_, args, context) => {
  try {
    const { data } = await axios.get(userUrl + "/user", context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const loginAction = async (_, { email, password }) => {
  try {
    const { data } = await axios.post(userUrl + "/login", { email, password });
    return { access_token: data.access_token };
  } catch (error) {
    console.log(errorAxios(error));
  }
};

module.exports = { userUrl, getAllUser, loginAction };
