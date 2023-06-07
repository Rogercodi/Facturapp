import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IPayer, IAppPayer } from "../../app-types/payer-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { PayerSQL } from "../../Repositories/SqlPayer";

export class payerController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    }

    public async newPayer (req: Request, res: Response, next: NextFunction) {
        try {
            const newPayer: IAppPayer = req.body
            const sqlPayer: IPayer = new PayerSQL(newPayer)
            const result = await this.userRepository.newPayer(sqlPayer);
            res.send({greenmessage: 'Nuevo pagador añadido correctamente', result})
        } catch (error) {
            res.send({redmessage: 'Algo ha fallado, por favor intente de nuevo'})
            console.log(error);
            next();
        }
    }
};