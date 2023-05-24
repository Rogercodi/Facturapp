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
const signupController_1 = require("../controllers/signupController");
const login_controller_1 = require("../controllers/login-controller");
const Router = express_1.default.Router();
//LOGIN
const logInController = new login_controller_1.LoginController();
Router.post("/signin", logInController.logIn.bind(logInController));
//REGISTER
const signUpController = new signupController_1.SignUpController();
Router.post('/signup', signUpController.signUp.bind(signUpController));
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
