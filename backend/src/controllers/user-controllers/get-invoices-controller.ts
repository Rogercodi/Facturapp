import { AppInvoice } from "../../Repositories/AppInvoice";
import { UserSqlRepository } from "../../db/UserSqlRepositories";
import { IAppInvoice, IInvoice } from "../../app-types/invoice-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { Request, Response, NextFunction } from "express";


export class getInvoicesController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    };

    public async getMyInvoices (req: Request, res: Response, next: NextFunction) {
        try {
            const { iduser } = req.body
            const appInvoices: IAppInvoice[] = await this.userRepository.getMyInvoices(iduser);
            return res.send({greenmessage: 'Your Invoices', appInvoices}) 
          } catch (error) {
            console.log(error)
            next();
          }
      }
};