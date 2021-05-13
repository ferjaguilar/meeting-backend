import { ApolloServer } from 'apollo-server';
import glue from 'schemaglue';
import connection from './database/connection';
import { validateToken } from './utils/tokenUtils';

const { schema, resolver } = glue('./src/graphql', { mode: 'ts' });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
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
