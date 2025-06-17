import { createServer } from './server';
import { env } from './lib/env';
import { API_URL } from './lib/constants';

const port = env.PORT || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${API_URL}`);
});
