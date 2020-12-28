import Debug from "debug";
const debug = Debug("debug");

import DebugConfig from "./debug";

let configer;

if (process.env.NODE_ENV == "debug") configer = DebugConfig;
else configer = DebugConfig;

export default new configer();
