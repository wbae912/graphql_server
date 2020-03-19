/* eslint-disable no-console */
const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Mutation {
    post(url: String! , description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

// We created a type called Query that returns a String...This TYPE MAPS to a RESOLVER FUNCTION BELOW

// [Link!]! => []! means we need an array TYPE => Link! we require a Link => so [Link!]! means that we require a NON-empty array

const resolvers = {
  Query: {
    info: () => 'This is a query',
    feed : () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link -${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};


const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('Server is running in http://localhost:4000'));

let links = [{
  id: 'link-0',
  url: 'www.reddit.com',
  description: 'a non addictive website'
}];

let idCount = links.length;

// GraphQL defaults to PORT 4000...We can go to Chrome and open up localhost:4000 and it will open the GraphQL playground
// Use node index.js to start the server
// This playground is similar to Postman