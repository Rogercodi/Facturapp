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
const User_1 = require("../Repositories/User");
const passport_1 = __importDefault(require("passport"));
const Router = express_1.default.Router();
Router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield API_1.API.poolConnection.query("SELECT * FROM test");
        res.send(result);
    }
    catch (error) {
        console.log(error);
        next();
    }
}));
//LOGIN
Router.post("/signin", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield passport_1.default.authenticate("local", (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        if (!user) {
            res.status(210).send({ message: "El usuario no existe" });
        }
        else {
            req.logIn(user, err => {
                if (err)
                    throw err;
                res.status(201).send({ message: "Bienvenido!", user });
            });
        }
    }))(req, res, next);
}));
//GETUSER
Router.post("/getuser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        let text = "SELECT * FROM users u WHERE u.email=$1";
        let values = [email];
        let result = yield API_1.API.poolConnection.query(text, values);
        let user = new User_1.User(result.rows[0]);
        res.send(user);
    }
    catch (error) {
        console.log(error);
        next();
    }
}));
//GET MYINVOICES
Router.post("/user/myinvoices", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield API_1.API.poolConnection.query("SELECT * FROM invoices");
    console.log(result.rows);
    res.send(result.rows);
}));
//GET MYPAYERS
Router.get('/user/mypayers', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //--------------------------------------//
    }
    catch (error) {
        console.log(error);
        next();
    }
}));
//NEW INVOICE
Router.post("/user/newinvoice", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { base, iva, totalIva, irpf, totalIrpf, body, fecha, total } = req.body;
    const text = "INSERT INTO invoices (base, iva, totalIva, irpf, totalirpf, body, fecha, total, idpayer) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const values = [base, iva, totalIva, irpf, totalIrpf, body, fecha, total, 1];
    const result = yield API_1.API.poolConnection.query(text, values);
    res.send(result.rows);
}));
//NEW PAYER
Router.post('/user/newpayer', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //------------------------//
        res.send('newpayer');
    }
    catch (error) {
        console.log(error);
        next();
    }
}));
exports.default = Router;
