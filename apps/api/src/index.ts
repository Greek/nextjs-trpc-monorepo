import { createServer } from "./server";
import { log } from "@repo/logger";
import { env } from "./utils/env";

const port = env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
