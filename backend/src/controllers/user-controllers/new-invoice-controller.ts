import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { IInvoice } from "../../app-types/invoice-type";

export class invoiceController {
  private userRepository: IUserSqlRepository;

  constructor() {
    this.userRepository = new UserSqlRepository();
  }

  public async newInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const newInvoice: IInvoice = req.body;
      const result: number = await this.userRepository.newInvoice(newInvoice);
      res.send({ message: "New invoice added successfully", result });
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
