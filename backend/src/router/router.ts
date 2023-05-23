import express, { NextFunction, Request, Response } from "express";
import { API } from "../API";
import { User, UserAppI, sqlUserI } from "../Repositories/User";
import { QueryResult } from "pg";

const Router = express.Router();

Router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result = await API.poolConnection.query("SELECT * FROM test");
  res.send(result);
  } catch (error) {
    console.log(error)
    next();
  }
  
});


//GETUSER
Router.post("/getuser", async (req: Request, res: Response, next: NextFunction) => {
  try {
    
  let { email } = req.body
  let text = "SELECT * FROM users u WHERE u.email=$1"
  let values = [email]
  let result: QueryResult<sqlUserI> = await API.poolConnection.query(text, values);
  let user: UserAppI = new User(result.rows[0])
  res.send(user);

  } catch (error) {
    console.log(error)
    next();
  }
});


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
