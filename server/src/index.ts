// index.ts
import 'reflect-metadata';
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { PrismaClient } from '@prisma/client';
import UserResolver from './schema/User/UserResolver';
import express from 'express';
import http from 'http';
const prisma = new PrismaClient();

const app = express();

const httpServer = http.createServer(app);

const main = async () => {
  const schema = await tq.buildSchema({ resolvers: [UserResolver] });

  const context = {
    prisma,
  };

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
