import { NextFunction, Request, Response } from "express";

export class LoginController {
    constructor(){}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            


            
        } catch (e) {
            console.log(e);
            next();
        }
    }
}