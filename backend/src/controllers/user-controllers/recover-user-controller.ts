import { NextFunction, Request, Response } from "express";
import {  UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { TRecoverData } from "../../app-types/recovery-types";


export class RecoverUserController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    }

    public async recoverUser(req: Request, res: Response, next: NextFunction) {
        try {
        let { email } = req.body;
        let result: TRecoverData[] | 0 = await this.userRepository.recoverUser(email);
        if(result === 0){
            res.send({redmessage: 'Este email no está registrado', result})
        } else {
            res.send({greenmessage: 'Usuario encontrado', result})
        }
            
        } catch (error) {
            res.send({redmessage: 'Algo ha fallado. Por favor, intente de nuevo'})
            console.log(error)
            next();
        }
    }
}