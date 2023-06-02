import express from "express";
import { getPayersController } from "../controllers/user-controllers/get-payers-controller";
import { getInvoicesController } from "../controllers/user-controllers/get-invoices-controller";
import { invoiceController } from "../controllers/user-controllers/new-invoice-controller";
import { payerController } from "../controllers/user-controllers/new-payer-controller";
import { updatePayerController } from "../controllers/user-controllers/update-payer-controller";
import { UpdateUserController } from "../controllers/user-controllers/update-user-controller";
import { auth } from "../helpers/pass-helper";
import { DeleteInvoicesController } from "../controllers/user-controllers/delete-invoice-controller";

//-------------------------------------------------- END IMPORTS -------------------------------------------------------------//

const Router = express.Router();

//GET MYINVOICES
const myInvoicesController = new getInvoicesController();
Router.post("/user/myinvoices", myInvoicesController.getMyInvoices.bind(myInvoicesController));

//GET MYPAYERS
const getMyPayersController = new getPayersController();
Router.post('/user/mypayers', getMyPayersController.getPayers.bind(getMyPayersController));

//NEW INVOICE
const newInvoiceController = new invoiceController();
Router.post("/user/newinvoice", newInvoiceController.newInvoice.bind(newInvoiceController));

//NEW PAYER
const newPayerController = new payerController();
Router.post('/user/newpayer',newPayerController.newPayer.bind(newPayerController))

//UPDATE PAYER
const editPayerController = new updatePayerController();
Router.put('/user/editpayer' ,editPayerController.updatePayer.bind(editPayerController));

//UPDATE USER
const editUserController = new UpdateUserController();
Router.put('/user/edituser',editUserController.updateUser.bind(editUserController));

//DELETE INVOICE
const deleteInvoiceController = new DeleteInvoicesController();
Router.delete('/user/deleteinvoice', deleteInvoiceController.deleteInvoice.bind(deleteInvoiceController));

export default Router;
