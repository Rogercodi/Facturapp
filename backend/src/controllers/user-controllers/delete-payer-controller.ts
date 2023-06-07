import { AppInvoice } from "../../Repositories/AppInvoice";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IAppInvoice, IInvoice } from "../../app-types/invoice-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { Request, Response, NextFunction } from "express";

export class DeletePayerController {
    private userRepository: IUserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    };

    public async deletePayer (req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            let result = await this.userRepository.deletePayer(id)
            if(result === 0){
                return res.send({redmessage: 'Pagador no encontrado'})
            } else {
            return res.send({greenmessage: 'Pagador eliminado', result}) 
            }
          } catch (error) {
            console.log(error)
            return res.send({redmessage: 'No se puede eliminar este pagador. Elimine primero sus facturas.'})
            
          }
      }
};