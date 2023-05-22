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
const express_1 = __importDefault(require("express"));
const API_1 = require("../API");
const Router = express_1.default.Router();
Router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield API_1.API.poolConnection.query('SELECT * FROM test');
    res.send(result);
}));
Router.get('/user/myinvoices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield API_1.API.poolConnection.query('SELECT * FROM users');
    res.send(result.rows);
}));
exports.default = Router;
