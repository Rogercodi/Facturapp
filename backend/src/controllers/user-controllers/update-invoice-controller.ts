import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../db/UserSqlRepositories";
import { IAppInvoice } from "../../app-types/invoice-type";
import { IInvoice } from "../../app-types/invoice-type";
import { InvoiceSQL } from "../../Repositories/SqlInvoice";

export class UpdateInvoiceController {
    private userRepository: UserSqlRepository;

    constructor(){
        this.userRepository = new UserSqlRepository();
    };


    public async updateInvoice(req: Request, res: Response, next: NextFunction) {
        
        try {
            const newInvoice: IAppInvoice = req.body;
            const sqlInvoice: IInvoice = new InvoiceSQL(newInvoice)
            const result: number = await this.userRepository.updateInvoice(sqlInvoice);
            res.send({ greenmessage: "Factura actualizada correctamente", result });
          } catch (error) {
            res.send({redmessage: 'No se ha podido actualizar la factura. Intente de nuevo'})
            console.log(error);
            next();
          }
    };
};