import express, { Request, Response} from "express";
import { API } from "../API";
 
const Router = express.Router();

 Router.get('/', async (req: Request, res: Response) => {
    let result = await API.poolConnection.query('SELECT * FROM test')
    res.send(result)
 });

 Router.get('/user/myinvoices', async (req: Request, res: Response) => {
   let result = await API.poolConnection.query('SELECT * FROM users')
   res.send(result.rows)
});

Router.post('/user/data/newinvoice', async (req: Request, res: Response) => {
   let result = await API.poolConnection.query('SELECT * FROM users')
   res.send(result.rows)
});

 export default Router;
