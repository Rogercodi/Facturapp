import { Configuration } from "./config/GetConfigClass";
import { API } from "./API";

require('dotenv').config();

const configuration = new Configuration().getConfigurations();
const {port, hostapp, node_env} = configuration.server;
const {hostdb, password, database, user} = configuration.sql;


const allEnvVariables = (port: number, hostapp: string, node_env: string, hostdb: string, password: string, database: string, userdb: string) => {
    return port && hostapp && node_env && hostdb && password && database && userdb
};

const app = new API();

const main = async () => {
    if(!allEnvVariables(port, hostapp, node_env, hostdb, password, database, user)){
        throw new Error('Missing Env Variables')
    } else {
        await app.init(configuration.server)
       
    }
};

main().catch((error) => {
    console.error('main err', error)
});

process.on("uncaughtException", err => {
    console.log("uncaughtException", err);
});



    
