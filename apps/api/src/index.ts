import { env } from '@api/lib/env';
import { logger } from '@api/lib/logger';
import { createServer } from '@api/server';

const port = env.PORT || 3000;
const server = createServer();

server.listen(port, () => logger.info(`Started server on ${env.API_URL}`));
