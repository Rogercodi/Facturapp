import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { IAppInvoice, IInvoice } from "../../app-types/invoice-type";
import { InvoiceSQL } from '../../Repositories/SqlInvoice'


export class invoiceController {
  private userRepository: IUserSqlRepository;

  constructor() {
    this.userRepository = new UserSqlRepository();
  }

  public async newInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const newInvoice: IAppInvoice = req.body;
      const sqlInvoice: IInvoice = new InvoiceSQL(newInvoice)
      const result: number = await this.userRepository.newInvoice(sqlInvoice);
      res.send({ greenmessage: "Factura guardada correctamente", result });
    } catch (error) {
      res.send({redmessage: 'No se ha podido guardar la factura. Intente de nuevo'})
      console.log(error);
      next();
    }
  }
}
