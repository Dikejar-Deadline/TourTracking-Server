const axios = require("axios");

const destinationUrl = "http://localhost:3000/destinations";

const getDestinations = async () => {
  try {
    const { data } = await axios.get(destinationUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createDestination = async (_, args) => {
  try {
    const { name, description, imgUrl } = args;
    const { data } = await axios.post(destinationUrl, { name, description, imgUrl });
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDestinations,
  createDestination,
};
