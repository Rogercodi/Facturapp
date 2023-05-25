import { Request, Response, NextFunction } from "express";


export class LogoutController {
    constructor() { }
    async logOut(req: Request, res: Response, next: NextFunction) {
        try {
            req.logOut((err: any) => {
                if (err) {
                    return next(err)
                };
                return res.send('Sesion cerrada, hasta la proxima!')
            });

        } catch (e) {
            console.log(e);
            next();
        }
    }
}