const axios = require("axios");
const roomUrl = "http://localhost:3000/rooms";
const destinationUrl = "http://localhost:3000/destinations";

const getDestinations = async () => {
  try {
    const { data } = await axios.get(destinationUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllRoom = async () => {
  try {
    const { data } = await axios.get(roomUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRoomDetail = async (_, args) => {
  try {
    const { id } = args;
    const { data } = await axios.get(`${roomUrl}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRoomByDestination = async (_, args) => {
  try {
    const { id } = args;
    const { data } = await axios.get(`${roomUrl}/destination/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createRoom = async (_, args) => {
  try {
    const { price, accountNumber, accountName, maxParticipant, minParticipant, schedule, dropPoint, duration, UserId, DestinationId } = args;
    const { data } = await axios.post(roomUrl, {
      price,
      accountNumber,
      accountName,
      maxParticipant,
      minParticipant,
      schedule,
      dropPoint,
      duration,
      UserId: +UserId,
      DestinationId: +DestinationId,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const editRoom = async (_, args) => {
  try {
    const { id, price, accountNumber, accountName, maxParticipant, minParticipant, schedule, dropPoint, duration, UserId, DestinationId } = args;
    const { data } = await axios.put(`${roomUrl}/${id}`, {
      id,
      price,
      accountNumber,
      accountName,
      maxParticipant,
      minParticipant,
      schedule,
      dropPoint,
      duration,
      UserId: +UserId,
      DestinationId: +DestinationId,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteRoom = async (_, args) => {
  try {
    const { id } = args;
    const { data } = await axios.delete(`${roomUrl}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDestinations,
  getAllRoom,
  getRoomDetail,
  getRoomByDestination,
  createRoom,
  editRoom,
  deleteRoom,
};
