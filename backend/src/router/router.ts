import express, { NextFunction, Request, Response } from "express";
import { API } from "../API";
import { User} from "../Repositories/User";
import { QueryResult } from "pg";
import passport from "passport";
import bcrypt from 'bcrypt';
import { SignUpController } from "../controllers/signupController";
import { LoginController } from "../controllers/login-controller";

const Router = express.Router();

//LOGIN
const logInController = new LoginController();
Router.post("/signin", logInController.logIn.bind(logInController));

//REGISTER
const signUpController = new SignUpController();
Router.post('/signup', signUpController.signUp.bind(signUpController))



//GET MYINVOICES
Router.post("/user/myinvoices", async (req: Request, res: Response, next: NextFunction) => {
  let result = await API.poolConnection.query("SELECT * FROM invoices");
  console.log(result.rows)
  res.send(result.rows);
});


//GET MYPAYERS
Router.get('/user/mypayers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    //--------------------------------------//
  } catch (error) {
    console.log(error)
    next();
  }
})

//NEW INVOICE
Router.post("/user/newinvoice", async (req: Request, res: Response) => {
  const { base, iva, totalIva, irpf, totalIrpf, body, fecha, total } = req.body;
  const text =
    "INSERT INTO invoices (base, iva, totalIva, irpf, totalirpf, body, fecha, total, idpayer) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  const values = [base, iva, totalIva, irpf, totalIrpf, body, fecha, total, 1];
  const result = await API.poolConnection.query(text, values);
  res.send(result.rows);
});

//NEW PAYER
Router.post('/user/newpayer', async (req: Request, res: Response, next: NextFunction) => {
  try {
    //------------------------//
    res.send('newpayer')
  } catch (error) {
    console.log(error)
    next();
  }
})

export default Router;
