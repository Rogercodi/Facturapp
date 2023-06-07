import { Request, Response, NextFunction } from "express"

export const auth = {
    pass: (req: Request, res: Response, next: NextFunction) => {
        if(req.isAuthenticated()){
            next()
        } else {
            res.send({redmessage: 'Ruta no autorizada. Por favor, inicie sesión'})
        }
    }
};