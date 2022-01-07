const { GraphQLServer } = require('graphql-yoga');
// Scalar tyoes - Strings, Boolean, Int, Float, ID

//demo

const users = [
  {
    id: '1',
    name: 'toto',
    email: 'example@example.com',
    age: 30,
  },

  {
    id: '2',
    name: 'toto2',
    email: 'example2@example.com',
    age: 32,
  },

  {
    id: '3',
    name: 'tot3',
    email: 'example3@example.com',
    age: 33,
  },
];

const posts = [
  {
    id: '1',
    title: 'hello',
    body: 'aie aie',
    published: true,
  },

  {
    id: '2',
    title: 'janine',
    body: 'beau',
    published: true,
  },

  {
    id: '3',
    title: 'flip',
    body: 'documents',
    published: true,
  },
];

// TYPE DEF === APP SCHEMA
const typeDefs = `
type Query {
 users(query : String) : [User!]!
 posts(query : String):  [Post!]!
 me : User!
 post: Post!

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

    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(
        (post) =>
          post.body
            .toLocaleLowerCase()
            .includes(args.query.toLocaleLowerCase()) ||
          post.title
            .toLocaleLowerCase()
            .includes(args.query.toLocaleLowerCase())
      );
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
