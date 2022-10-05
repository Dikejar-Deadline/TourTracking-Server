const { ApolloServer, gql } = require("apollo-server");
const { getAllUser, loginAction } = require("./actions/user");

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
    role: String
  }

  type Auth {
    access_token: String
  }

  type Query {
    user: [User]
    login(email: String, password: String): Auth
  }

  type Mutation {}
`;

const resolvers = {
  Query: {
    user: getAllUser,
    login: loginAction,
  },
  Mutation: {},
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
