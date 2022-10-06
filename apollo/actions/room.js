const axios = require("axios");
const { errorAxios } = require("../errorHandling/axiosError");
const roomUrl = `${process.env.SERVICE1}/rooms`;
const userUrl = `${process.env.SERVICE2}`;

const getAllRoom = async (_, args, context) => {
  try {
    const { data } = await axios.get(roomUrl, context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
  }
};

const getRoomDetail = async (_, args, context) => {
  try {
    const { id } = args;
    const { data } = await axios.get(`${roomUrl}/${id}`, context.headers);
    const participants = data.Participants;
    if (participants.length > 0) {
      const { data: participantById } = await axios.post(
        `${userUrl}/auth/participant`,
        {
          participantId: participants.map((participant) => participant.UserId),
        }
      );
      data.Participants = participantById;
    }

    return data;
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
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
    throw new Error(errorAxios(error).data.message);
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
    throw new Error(errorAxios(error).data.message);
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
    throw new Error(errorAxios(error).data.message);
  }
};

const deleteRoom = async (_, args, context) => {
  try {
    const { id } = args;
    const { data } = await axios.delete(`${roomUrl}/${id}`, context.headers);
    return data;
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
  }
};

const joinRoom = async (_, args, context) => {
  try {
    const { id } = args;
    const { data } = await axios.post(
      `${roomUrl}/${id}/join-room`,
      context.headers
    );
    return data;
  } catch (error) {
    console.log(errorAxios(error));
    throw new Error(errorAxios(error).data.message);
  }
};

module.exports = {
  getAllRoom,
  getRoomDetail,
  getRoomByDestination,
  createRoom,
  editRoom,
  deleteRoom,
  joinRoom,
};
