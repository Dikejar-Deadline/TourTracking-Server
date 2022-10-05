const axios = require("axios");
const { errorAxios } = require("../errorHandling/axiosError");
const destinationUrl = `${process.env.SERVICE1}/destinations`;

const getDestinations = async (_, args, context) => {
  try {
    const { data } = await axios.get(destinationUrl, context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const createDestination = async (_, args, context) => {
  try {
    const { name, description, imgUrl } = args;
    const { data } = await axios.post(
      destinationUrl,
      {
        name,
        description,
        imgUrl,
      },
      context.headers
    );
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const getDestionationId = async (_, { id }, context) => {
  try {
    const { data } = await axios.get(
      destinationUrl + `/${id}`,
      context.headers
    );
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const updateDestinationId = async (_, args, context) => {
  try {
    const form = ({ name, description, imgUrl } = args);
    const { data } = await axios.put(
      destinationUrl + `/${args.id}`,
      form,
      context.headers
    );
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const deleteDestionationId = async (_, { id }, context) => {
  try {
    await axios.delete(destinationUrl + `/${id}`, context.headers);
    return true;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

module.exports = {
  getDestinations,
  createDestination,
  getDestionationId,
  updateDestinationId,
  deleteDestionationId,
};
