"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolConnection = void 0;
const pg_1 = require("pg");
const GetConfigClass_1 = require("../config/GetConfigClass");
class PoolConnection {
    constructor() {
        this.pool = new pg_1.Pool(new GetConfigClass_1.Configuration().getConfigurations().sql);
    }
    getPool() {
        return this.pool;
    }
}
exports.PoolConnection = PoolConnection;
