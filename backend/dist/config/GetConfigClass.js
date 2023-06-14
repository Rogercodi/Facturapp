"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration {
    getConfigurations() {
        return {
            server: this.getServerConfig(),
            sql: this.getSqlConfig(),
            emailjs: this.getEmailConfig()
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
    getEmailConfig() {
        const emailConfig = {
            service_id: process.env.EMAIL_SERVICE_ID,
            template_id: process.env.EMAIL_TEMPLATE_ID,
            public_key: process.env.EMAIL_PUBLIC_KEY
        };
        return emailConfig;
    }
}
exports.Configuration = Configuration;
;
