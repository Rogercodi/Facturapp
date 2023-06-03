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
            console.log(id)
            let result = await this.userRepository.deletePayer(id)
            console.log(result)
            if(result === 0){
                return res.send({message: 'Invoice not found'})
            } else {
            return res.send({message: 'Deleted!', result}) 
            }
          } catch (error) {
            console.log(error)
            next();
          }
      }
};