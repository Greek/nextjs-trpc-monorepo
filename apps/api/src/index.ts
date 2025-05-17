import { createServer } from "./server";
import { env } from "./utils/env";

const port = env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
