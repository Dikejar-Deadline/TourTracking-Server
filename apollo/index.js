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
  }

  type RoomByDestination {
    id: ID
    name: String
    description: String
    imgUrl: String
    Rooms: [Room]
  }

  type Query {
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
    login(email: String, password: String): Auth
    getUser: User
    users: [User]
    destinations: [Destination]
    destinationId(id: ID): Destination
    rooms: [Room]
    roomById(id: ID!): RoomDetail
    roomByDestination(id: ID!): RoomByDestination
  }

  type Mutation {
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
    deleteDestination(id: ID): Boolean
    createRoom(
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
      UserId: ID
      DestinationId: ID
    ): Room
    deleteRoom(id: ID): Boolean
  }
`;

const resolvers = {
  Query: {
    register: registerAction,
    login: loginAction,
    getUser: getUser,
    users: getAllUser,
    destinations: getDestinations,
    destinationId: getDestionationId,
    rooms: getAllRoom,
    roomById: getRoomDetail,
    roomByDestination: getRoomByDestination,
  },
  Mutation: {
    createDestination: createDestination,
    editDestination: updateDestinationId,
    deleteDestination: deleteDestionationId,
    createRoom: createRoom,
    editRoom: editRoom,
    deleteRoom: deleteRoom,
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
