const { ApolloServer, gql } = require("apollo-server");
const {
  loginAction,
  registerAction,
  getAllUser,
  getUser,
} = require("./actions/user");

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
  }
`;

const resolvers = {
  Query: {
    register: registerAction,
    login: loginAction,
    getUser: getUser,
    users: getAllUser,
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
