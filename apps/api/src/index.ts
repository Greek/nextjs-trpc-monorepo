import { API_URL } from './lib/constants';
import { env } from './lib/env';
import { Logger } from './lib/logger';
import { createServer } from './server';

const port = env.PORT || 3000;
const server = createServer();

server.listen(port, () => {
  Logger.getInstance().info(`api running on ${API_URL}`);
});
