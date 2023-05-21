import { IConfiguration, AppConfiguration, serverConfig, sqlConfig } from "./Config-types";

export class Configuration implements IConfiguration {
  
    public getConfigurations(): AppConfiguration {
    return {
      server: this.getServerConfig(),
      sql: this.getSqlConfig(),
    };
  };

  private getServerConfig(): serverConfig {
    const ServerConfig: serverConfig = {
      port: parseInt(<string>process.env.PORT),
      hostapp: <string>process.env.HOSTAPP,
      node_env: <string>process.env.NODE_ENV,
    };
    return ServerConfig;
  };

  private getSqlConfig(): sqlConfig {
    const sqlConfig: sqlConfig = {
      hostdb: <string>process.env.HOSTDB,
      password: <string>process.env.PASSWORD,
      database: <string>process.env.DATABASE,
      user: <string>process.env.USERDB,
    };

    return sqlConfig;
  };
};
