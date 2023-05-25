import { IPayer } from "../../app-types/payer-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { Request, Response, NextFunction } from "express";


export class getPayersController {
    private userRepository: IUserSqlRepository

    constructor(){
        this.userRepository = new UserSqlRepository()
    }

   public async getPayers (req: Request, res: Response, next: NextFunction) {
        try {
          const { idusuario } = req.body
          const myPayers = await this.userRepository.getMyPayers(idusuario)
          return res.send({message: 'Your Payers', myPayers}) 
        } catch (error) {
          console.log(error)
          next();
        }
      }

}