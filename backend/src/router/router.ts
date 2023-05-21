import express, { Request, Response} from "express";
 
const Router = express.Router();

 Router.get('/', (req: Request, res: Response) => {
    console.log('hola')
    res.send('Hola pollastre')
 });

 export default Router;
