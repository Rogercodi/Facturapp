import express from "express";
import { getPayersController } from "../controllers/user-controllers/get-payers-controller";
import { getInvoicesController } from "../controllers/user-controllers/get-invoices-controller";
import { invoiceController } from "../controllers/user-controllers/new-invoice-controller";
import { payerController } from "../controllers/user-controllers/new-payer-controller";
import { updatePayerController } from "../controllers/user-controllers/update-payer-controller";
import { UpdateUserController } from "../controllers/user-controllers/update-user-controller";
import { auth } from "../helpers/pass-helper";

//-------------------------------------------------- END IMPORTS -------------------------------------------------------------//

const Router = express.Router();

//GET MYINVOICES
const myInvoicesController = new getInvoicesController();
Router.post("/user/myinvoices",auth.pass, myInvoicesController.getMyInvoices.bind(myInvoicesController));

//GET MYPAYERS
const getMyPayersController = new getPayersController();
Router.post('/user/mypayers',auth.pass, getMyPayersController.getPayers.bind(getMyPayersController));

//NEW INVOICE
const newInvoiceController = new invoiceController();
Router.post("/user/newinvoice", auth.pass, newInvoiceController.newInvoice.bind(newInvoiceController));

//NEW PAYER
const newPayerController = new payerController();
Router.post('/user/newpayer', auth.pass,newPayerController.newPayer.bind(newPayerController))

//UPDATE PAYER
const editPayerController = new updatePayerController();
Router.put('/user/editpayer', auth.pass,editPayerController.updatePayer.bind(editPayerController));

//UPDATE USER
const editUserController = new UpdateUserController();
Router.put('/user/edituser', auth.pass,editUserController.updateUser.bind(editUserController));

export default Router;
