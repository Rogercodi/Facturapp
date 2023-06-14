export interface sqlConfig {
    hostdb: string;
    password: string;
    database: string;
    user: string;
  };

  export interface emailjsConfig {
    service_id: string,
    template_id: string,
    public_key: string
  };
  
  export interface serverConfig {
    port: number;
    hostapp: string;
    node_env: string;
  };
  
  export interface AppConfiguration {
    server: serverConfig;
    sql: sqlConfig;
    emailjs: emailjsConfig
  };
  
  export interface IConfiguration {
      getConfigurations(): AppConfiguration
  };