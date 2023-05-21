export interface sqlConfig {
    hostdb: string;
    password: string;
    database: string;
    user: string;
  }
  
  export interface serverConfig {
    port: number;
    hostapp: string;
    node_env: string;
  }
  
  export interface AppConfiguration {
    server: serverConfig;
    sql: sqlConfig;
  }
  
  export interface IConfiguration {
      getConfigurations(): AppConfiguration
  }