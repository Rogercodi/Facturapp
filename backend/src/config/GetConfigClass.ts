import { IConfiguration, AppConfiguration, serverConfig, sqlConfig, emailjsConfig } from "./Config-types";

export class Configuration implements IConfiguration {
  
    public getConfigurations(): AppConfiguration {
    return {
      server: this.getServerConfig(),
      sql: this.getSqlConfig(),
      emailjs: this.getEmailConfig()
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

  private getEmailConfig(): emailjsConfig {
    const emailConfig: emailjsConfig = {
      service_id: <string>process.env.EMAIL_SERVICE_ID,
      template_id: <string>process.env.EMAIL_TEMPLATE_ID,
      public_key: <string>process.env.EMAIL_PUBLIC_KEY
    }
    
    return emailConfig
  }
};
