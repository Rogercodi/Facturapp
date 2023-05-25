"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_controller_1 = require("../controllers/index-controllers/signup-controller");
const login_controller_1 = require("../controllers/index-controllers/login-controller");
const get_payers_controller_1 = require("../controllers/user-controllers/get-payers-controller");
const get_invoices_controller_1 = require("../controllers/user-controllers/get-invoices-controller");
const new_invoice_controller_1 = require("../controllers/user-controllers/new-invoice-controller");
const new_payer_controller_1 = require("../controllers/user-controllers/new-payer-controller");
const logout_controller_1 = require("../controllers/index-controllers/logout-controller");
const update_payer_controller_1 = require("../controllers/user-controllers/update-payer-controller");
const update_user_controller_1 = require("../controllers/user-controllers/update-user-controller");
const Router = express_1.default.Router();
//LOGIN
const logInController = new login_controller_1.LoginController();
Router.post("/signin", logInController.logIn.bind(logInController));
//REGISTER
const signUpController = new signup_controller_1.SignUpController();
Router.post('/signup', signUpController.signUp.bind(signUpController));
//LOGOUT
const logOutController = new logout_controller_1.LogoutController();
Router.get('/logout', logOutController.logOut.bind(logOutController));
//GET MYINVOICES
const myInvoicesController = new get_invoices_controller_1.getInvoicesController();
Router.post("/user/myinvoices", myInvoicesController.getMyInvoices.bind(myInvoicesController));
//GET MYPAYERS
const getMyPayersController = new get_payers_controller_1.getPayersController();
Router.post('/user/mypayers', getMyPayersController.getPayers.bind(getMyPayersController));
//NEW INVOICE
const newInvoiceController = new new_invoice_controller_1.invoiceController();
Router.post("/user/newinvoice", newInvoiceController.newInvoice.bind(newInvoiceController));
//NEW PAYER
const newPayerController = new new_payer_controller_1.payerController();
Router.post('/user/newpayer', newPayerController.newPayer.bind(newPayerController));
//UPDATE PAYER
const editPayerController = new update_payer_controller_1.updatePayerController();
Router.put('/user/editpayer', editPayerController.updatePayer.bind(editPayerController));
//UPDATE USER
const editUserController = new update_user_controller_1.UpdateUserController();
Router.put('/user/edituser', editUserController.updateUser.bind(editUserController));
exports.default = Router;
