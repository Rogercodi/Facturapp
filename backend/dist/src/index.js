"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetConfigClass_1 = require("./config/GetConfigClass");
const API_1 = require("./API");
require('dotenv').config();
const configuration = new GetConfigClass_1.Configuration().getConfigurations();
const { port, hostapp, node_env } = configuration.server;
const { hostdb, password, database, user } = configuration.sql;
const allEnvVariables = (port, hostapp, node_env, hostdb, password, database, userdb) => {
    return port && hostapp && node_env && hostdb && password && database && userdb;
};
const app = new API_1.API();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!allEnvVariables(port, hostapp, node_env, hostdb, password, database, user)) {
        throw new Error('Missing Env Variables');
    }
    else {
        yield app.init(configuration.server);
        console.log(`hola, ${port}, ${hostapp}`);
    }
});
main().catch((error) => {
    console.error('main err', error);
});
process.on("uncaughtException", err => {
    console.log("uncaughtException", err);
});
