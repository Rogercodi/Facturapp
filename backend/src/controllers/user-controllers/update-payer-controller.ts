import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IPayer } from "../../app-types/payer-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";

export class updatePayerController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    }

    public async updatePayer(req: Request, res: Response, next: NextFunction) {
        
        let toUpdatePayer: IPayer = req.body
        console.log(toUpdatePayer)
        const result = await this.userRepository.updatePayer(toUpdatePayer);
        res.send({message: 'Payer updated successfully', result})
    }
}


