require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const {
  loginAction,
  registerAction,
  getAllUser,
  getUser,
} = require("./actions/user");
const {
  getAllRoom,
  getRoomDetail,
  getRoomByDestination,
  createRoom,
  editRoom,
  deleteRoom,
  joinRoom,
} = require("./actions/room");
const {
  getDestinations,
  createDestination,
  getDestionationId,
  deleteDestionationId,
  updateDestinationId,
} = require("./actions/destination");

const typeDefs = gql`
  type User {
    id: String
    firstName: String
    lastName: String
    picture: String
    username: String
    email: String
    phoneNumber: String
    address: String
    role: String
  }

  type Auth {
    access_token: String
  }

  type Destination {
    id: ID
    name: String
    description: String
    imgUrl: String
  }

  type Room {
    id: ID
    price: Int
    accountNumber: Int
    accountName: String
    maxParticipant: Int
    minParticipant: Int
    schedule: String
    dropPoint: String
    duration: Int
    UserId: ID
    DestinationId: ID
    Destination: Destination
  }

  type Participant {
    id: ID
    picture: String
    username: String
  }

  type RoomDetail {
    id: ID
    price: Int
    accountNumber: Int
    accountName: String
    maxParticipant: Int
    minParticipant: Int
    schedule: String
    dropPoint: String
    duration: Int
    UserId: ID
    DestinationId: ID
    Destination: Destination
    Participants: [Participant]
  }

  type DestinationDetail {
    id: ID
    name: String
    description: String
    imgUrl: String
    Rooms: [Room]
  }

  type RoomByDestination {
    id: ID
    name: String
    description: String
    imgUrl: String
    Rooms: [Room]
  }

  type Query {
    getUser: User
    users: [User]
    destinations: [Destination]
    destinationId(id: ID!): DestinationDetail
    rooms: [Room]
    roomById(id: ID!): RoomDetail
    roomByDestination(id: ID!): RoomByDestination
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(
      firstName: String
      lastName: String
      picture: String
      username: String
      email: String
      phoneNumber: String
      address: String
      password: String
    ): User
    createDestination(
      name: String
      description: String
      imgUrl: String
    ): Destination
    editDestination(
      id: ID
      name: String
      description: String
      imgUrl: String
    ): Destination
    deleteDestination(id: ID!): Boolean
    createRoom(
      price: Int
      accountNumber: Int
      accountName: String
      maxParticipant: Int
      minParticipant: Int
      schedule: String
      dropPoint: String
      duration: Int
      DestinationId: ID
    ): Room
    editRoom(
      id: ID
      price: Int
      accountNumber: Int
      accountName: String
      maxParticipant: Int
      minParticipant: Int
      schedule: String
      dropPoint: String
      duration: Int
      DestinationId: ID
    ): Room
    deleteRoom(id: ID): Boolean
    joinRoom(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    getUser: getUser, // skip
    users: getAllUser, // skip
    destinations: getDestinations, // Done
    destinationId: getDestionationId, // Done
    rooms: getAllRoom, // Done
    roomById: getRoomDetail, // Done
    roomByDestination: getRoomByDestination,
  },
  Mutation: {
    login: loginAction, // Done
    register: registerAction, // skip
    createDestination: createDestination, // Done
    editDestination: updateDestinationId, // Done
    deleteDestination: deleteDestionationId, // Done
    createRoom: createRoom, // Done
    editRoom: editRoom, // Pending
    deleteRoom: deleteRoom, // Pending
    joinRoom: joinRoom, // Now
  },
};

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    return {
      headers: {
        headers: {
          Authorization: token,
        },
      },
    };
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Apollo Server ready at ${url}`);
});
