import 'reflect-metadata';
import { createServer } from '../utils/createServer';

// start our server
const main = async () => {
  const { app, server } = await createServer();

  app.get('/', async () => 'OKEY DOKEY');

  await server.start();

  await app.listen({
    port: 4000,
  });

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
};

main();
