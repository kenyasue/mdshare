import express from "express";

import config from "./config";
import { server, ServerConfig } from "./server";

const serverConfig: ServerConfig = {
  port: config.port,
};

(async () => {
  await server.init();
  server.listen(serverConfig);
})();
