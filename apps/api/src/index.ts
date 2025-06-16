import { createServer } from './server';
import { env } from './lib/env';

const port = env.PORT || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
