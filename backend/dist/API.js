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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const Pool_1 = require("./db/Pool");
const router_1 = __importDefault(require("./router/router"));
class API {
    constructor() {
        this.app = (0, express_1.default)(),
            this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:5173',
            credentials: true
        }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(router_1.default);
    }
    ;
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            API.poolConnection = new Pool_1.PoolConnection().pool;
            return this.listen(config.port, config.hostapp);
        });
    }
    listen(port, host) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.httpServer = this.app.listen(port, host, () => {
                console.log('Successfully running on Port 3000');
            });
        });
    }
}
exports.API = API;
;
