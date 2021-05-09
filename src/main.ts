import { ApolloServer } from 'apollo-server';
import glue from 'schemaglue';
import connection from './database/connection';

const { schema, resolver } = glue('./src/graphql', { mode: 'ts' });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
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
