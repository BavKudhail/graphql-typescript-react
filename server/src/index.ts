// index.ts
import 'reflect-metadata';
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import UserResolver from './schema/User/UserResolver';
import express from 'express';

const prisma = new PrismaClient();

const app = express();

const main = async () => {
  const schema = await tq.buildSchema({ resolvers: [UserResolver] });

  const context = {
    prisma,
  };

  const server = new ApolloServer({
    schema,
    context,
  });

  await server.listen({
    port: 4000,
  });

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
