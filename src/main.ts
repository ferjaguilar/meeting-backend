import { ApolloServer } from 'apollo-server';
import connection from './database/connection';
import { validateToken } from './utils/tokenUtils';

// Schemas and resolvers
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*',
    credentials: true,
  },
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = validateToken(token.replace('Bearer ', ''));
    return { user };
  },
});

const main = async () => {
  try {
    const { url } = await server.listen();
    console.log(`Server running on ${url}`);
    connection();
  } catch (error) {
    throw new Error(`Server Error ${error}`);
  }
};

main();
