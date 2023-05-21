"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration {
    getConfigurations() {
        return {
            server: this.getServerConfig(),
            sql: this.getSqlConfig(),
        };
    }
    ;
    getServerConfig() {
        const ServerConfig = {
            port: parseInt(process.env.PORT),
            hostapp: process.env.HOSTAPP,
            node_env: process.env.NODE_ENV,
        };
        return ServerConfig;
    }
    ;
    getSqlConfig() {
        const sqlConfig = {
            hostdb: process.env.HOSTDB,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            user: process.env.USERDB,
        };
        return sqlConfig;
    }
    ;
}
exports.Configuration = Configuration;
;
