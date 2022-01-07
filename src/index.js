const { GraphQLServer } = require('graphql-yoga');
// Scalar tyoes - Strings, Boolean, Int, Float, ID

// TYPE DEF === APP SCHEMA
const typeDefs = `
type Query {
 me : User!
 post: Post!
 greetings(name: String) : String!
 grades: [Int!]!
 add(numbers : [Float!]!) :  Float!
}

type User {
  id: ID!
  name : String!
  email: String!
  age : Int
}

type Post {
  id: ID!
  title : String!
  body: String!
  published : Boolean!
}


`;

// RESOLVERS
const resolvers = {
  Query: {
    grades(parent, args, ctx, info) {
      return [99, 88, 93];
    },
    me() {
      return {
        id: '123456',
        name: 'Mike',
        email: 'mike@example.com',
        age: 30,
      };
    },

    post() {
      return {
        id: '1234567',
        title: 'post title',
        body: 'hello',
        published: true,
      };
    },

    greetings(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`;
      }
      return 'Hello';
    },

    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }

      return args.numbers.reduce((acc, current) => acc + current);
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
