import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IPayer } from "../../app-types/payer-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";

export class payerController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    }

    public async newPayer (req: Request, res: Response, next: NextFunction) {
        try {
            const newPayer: IPayer = req.body
            const result = await this.userRepository.newPayer(newPayer);
            res.send({message: 'New payer added successfully', result})
        } catch (error) {
            console.log(error);
            next();
        }
    }
};