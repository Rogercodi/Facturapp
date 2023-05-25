import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { Request, Response, NextFunction } from "express";
export class getInvoicesController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    };

    public async getMyInvoices (req: Request, res: Response, next: NextFunction) {
        try {
            const { idusuario } = req.body
            const myInvoices = await this.userRepository.getMyInvoices(idusuario)
            return res.send({message: 'Your Invoices', myInvoices}) 
          } catch (error) {
            console.log(error)
            next();
          }
      }
};