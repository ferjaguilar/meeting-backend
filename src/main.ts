import { ApolloServer, gql } from 'apollo-server';

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  try {
    const { url } = await server.listen();
    console.log(`Server running on ${url}`);
  } catch (error) {
    throw new Error(`Server Error ${error}`);
  }
};

main();
