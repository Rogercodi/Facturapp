import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { sqlUserI } from "../../app-types/user-types";

export class UpdateUserController {
    private userRepository: IUserSqlRepository

    constructor(){
        this.userRepository = new UserSqlRepository();
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            let toUpdateUser: sqlUserI = req.body;
            console.log(toUpdateUser);
            let result = await this.userRepository.updateUser(toUpdateUser);
            res.send({message: 'User successfully updated', result})


        } catch (error) {
            console.log(error);
            next();           
        };
    };
};