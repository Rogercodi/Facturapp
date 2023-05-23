import express, { NextFunction, Request, Response } from "express";
import { API } from "../API";
import { UserRepository } from "../Repositories/UserRepositories";
import { User, UserAppI, sqlUserI } from "../Repositories/User";
import { QueryResult } from "pg";

const Router = express.Router();

Router.get("/", async (req: Request, res: Response) => {
  let result = await API.poolConnection.query("SELECT * FROM test");
  res.send(result);
});


//GETUSER
Router.post("/getuser", async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { email } = req.body
  console.log(req.body)
  const text = "SELECT * FROM users u WHERE u.email=$1"
  const values = [email]
  let result: QueryResult<sqlUserI> = await API.poolConnection.query(text, values);
  console.log(result.rows)
  let user: UserAppI = new User(result.rows[0])
  console.log(user)
  res.send(user);

  } catch (error) {
    console.log(error)
    next();
  }
});



Router.get("/user/myinvoices", async (req: Request, res: Response) => {
  let result = await API.poolConnection.query("SELECT * FROM invoices");

  res.send(result.rows);
});

Router.post("/user/newinvoice", async (req: Request, res: Response) => {
  const { base, iva, totalIva, irpf, totalIrpf, body, fecha, total } = req.body;
  const text =
    "INSERT INTO invoices (base, iva, totalIva, irpf, totalirpf, body, fecha, total, idpayer) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  const values = [base, iva, totalIva, irpf, totalIrpf, body, fecha, total, 1];
  const result = await API.poolConnection.query(text, values);
  res.send(result.rows);
});

export default Router;
