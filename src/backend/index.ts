import express = require("express");

import config from "./config";
import { Server, ServerConfig } from "./server";

const serverConfig: ServerConfig = {
  port: config.port,
};

const server = new Server(serverConfig);
server.listen();
