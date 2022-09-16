import { buildSchema } from 'type-graphql';
import UserResolver from '../src/modules/user/userResolver';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import fastify from 'fastify';

// initialising app
const app = fastify();

const buildContext = () => {};

// creating a server
export const createServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    context: buildContext,
    // defining plugins
    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer: app.server,
      }),
    ],
  });

  return { app, server };
};
