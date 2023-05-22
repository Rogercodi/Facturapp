import { Pool } from "pg";
import { Configuration } from "../config/GetConfigClass";


export class PoolConnection {
    pool: Pool

    constructor () {
        this.pool = new Pool(new Configuration().getConfigurations().sql)
    }

    public getPool() {
        return this.pool
    }
};