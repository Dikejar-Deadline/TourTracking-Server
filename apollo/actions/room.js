const axios = require("axios");
const { errorAxios } = require("../errorHandling/axiosError");
const roomUrl = "https://2c56-203-78-114-49.ap.ngrok.io/rooms";

const getAllRoom = async (_, args, context) => {
  try {
    const { data } = await axios.get(roomUrl, context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const getRoomDetail = async (_, args, context) => {
  try {
    const { id } = args;
    const { data } = await axios.get(`${roomUrl}/${id}`, context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const getRoomByDestination = async (_, args, context) => {
  try {
    const { id } = args;
    const { data } = await axios.get(
      `${roomUrl}/destination/${id}`,
      context.headers
    );
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const createRoom = async (_, args, context) => {
  try {
    const form = ({
      price,
      accountNumber,
      accountName,
      maxParticipant,
      minParticipant,
      schedule,
      dropPoint,
      duration,
      UserId,
      DestinationId,
    } = args);
    const { data } = await axios.post(
      roomUrl,
      {
        ...form,
        UserId: +UserId,
        DestinationId: +DestinationId,
      },
      context.headers
    );
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const editRoom = async (_, args, context) => {
  try {
    const form = ({
      id,
      price,
      accountNumber,
      accountName,
      maxParticipant,
      minParticipant,
      schedule,
      dropPoint,
      duration,
      UserId,
      DestinationId,
    } = args);
    const { data } = await axios.put(
      `${roomUrl}/${id}`,
      {
        ...form,
        UserId: +UserId,
        DestinationId: +DestinationId,
      },
      context.headers
    );
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

const deleteRoom = async (_, args, context) => {
  try {
    const { id } = args;
    const { data } = await axios.delete(`${roomUrl}/${id}`, context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
  }
};

module.exports = {
  getAllRoom,
  getRoomDetail,
  getRoomByDestination,
  createRoom,
  editRoom,
  deleteRoom,
};
