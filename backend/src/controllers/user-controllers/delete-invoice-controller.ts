import { AppInvoice } from "../../Repositories/AppInvoice";
import { UserSqlRepository } from "../../db/UserSqlRepositories";
import { IAppInvoice, IInvoice } from "../../app-types/invoice-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { Request, Response, NextFunction } from "express";

export class DeleteInvoicesController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    };

    public async deleteInvoice (req: Request, res: Response, next: NextFunction) {
        try {
            
            const { idInvoice } = req.body;
            let result = await this.userRepository.deleteInvoice(idInvoice)

            if(result === 0){
                return res.send({redmessage: 'Factura no encontrada'})
            } else {
            return res.send({greenmessage: 'Factura borrada correctamente', result}) 
            }
          } catch (error) {
            console.log(error)
            next();
          }
      }
};