import { Request, Response, NextFunction } from "express";
import { UserSqlRepository } from "../../db/UserSqlRepositories";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { TNewPasswordData } from "../../app-types/recovery-types";
import bcrypt from 'bcrypt';

export class NewPasswordUserController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    };

    public async newPassword (req: Request, res: Response, next: NextFunction) {
        try {
            let {password, email} = req.body;
            let hashedPassword = await bcrypt.hash(password, 10);
            let updateData:TNewPasswordData = {
                email,
                password: hashedPassword
            }
            let result = await this.userRepository.setNewPassword(updateData);
            if(result === 1){
                res.send({greenmessage: 'Contraseña actualizada!'})
            } else {
                res.send({redmessage: 'Contraseña no actualizada. Intente de nuevo'})
            }
        } catch (error) {
            console.log(error)
            next();
        }
    }
}