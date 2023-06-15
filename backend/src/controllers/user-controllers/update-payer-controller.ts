import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../db/UserSqlRepositories";
import { IPayer, IAppPayer } from "../../app-types/payer-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { PayerSQL } from "../../Repositories/SqlPayer";

export class updatePayerController {
  private userRepository: IUserSqlRepository;

  constructor() {
    this.userRepository = new UserSqlRepository();
  }

  public async updatePayer(req: Request, res: Response, next: NextFunction) {
    try {
      let toUpdatePayer: IAppPayer = req.body;
      const result = await this.userRepository.updatePayer(toUpdatePayer);
      return res.send({ greenmessage: "Pagador actualizado correctamente", result });
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
