const axios = require("axios");
const destinationUrl = "https://2c56-203-78-114-49.ap.ngrok.io/destinations";

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
    const { data } = await axios.post(destinationUrl, {
      name,
      description,
      imgUrl,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDestionationId = async (_, { id }) => {
  try {
    const { data } = await axios.get(destinationUrl + `/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateDestinationId = async (_, args) => {
  try {
    const form = ({ name, description, imgUrl } = args);
    const { data } = await axios.put(destinationUrl + `/${args.id}`, form);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteDestionationId = async (_, { id }) => {
  try {
    await axios.delete(destinationUrl + `/${id}`);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDestinations,
  createDestination,
  getDestionationId,
  updateDestinationId,
  deleteDestionationId,
};
