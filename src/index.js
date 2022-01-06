const { GraphQLServer } = require('graphql-yoga');
// TYPE DEF === APP SCHEMA
const typeDefs = `
type Query {
  hello: String!
  name: String!
}
`;

// RESOLVERS
const resolvers = {
  Query: {
    hello() {
      return 'this is my first query ';
    },
    name() {
      return 'this is my second query ';
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Server is now up and running at http://localhost:4000');
});
