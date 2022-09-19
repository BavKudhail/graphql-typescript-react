import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { execute, GraphQLSchema, subscribe } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaClient } from '@prisma/client';
import UserResolver from './schema/User/UserResolver';
import express from 'express';

// cookies
import cookieParser from 'cookie-parser';

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { BuildContext } from 'type-graphql/dist/schema/build-context';
const prisma = new PrismaClient();

const app = express();



console.log('hello');

// const webSocketContext = ({ request, reply, connectionParams }) => {
//   return { request, reply };
// };

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (
      ['https://localhost:4000', 'https://studio.apollographql.com/'].includes(
        origin
      )
    ) {
      return callback(null, true);
    }
    return callback(new Error('not allowed'), false);
  },
  // credentials is required as we are going to be setting cookies
  credentials: true,
};


const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });

  const context = {
    prisma,
  };

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context,
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:4000${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, 'error');
});

// @21.52 - person creates another server - a subscriptionServer, why is this required?

// not sure why a subscription server is required tho?

// const subscriptionServer = (schema, server) => {
//   schema: GraphQLSchema;
//   server: ApolloServer;

//   return SubscriptionServer.create(
//     {
//       schema,
//       execute,
//       subscribe,
//       async onConnect(connectionParams: Object) {
//         return webSocketContext({ connectionParams });
//       },
//     },
//     {
//       server,
//       path: '/graphql',
//     }
//   );
// };
