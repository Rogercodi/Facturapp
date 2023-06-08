import { IAppPayer, IPayer } from "../../app-types/payer-type";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { AppPayer } from "../../Repositories/AppPayer";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
import { Request, Response, NextFunction } from "express";

export class getPayersController {
  private userRepository: IUserSqlRepository;

  constructor() {
    this.userRepository = new UserSqlRepository();
  }

  public async getPayers(req: Request, res: Response, next: NextFunction) {
    try {
      const { iduser } = req.body;
      const myPayers: IPayer[] = await this.userRepository.getMyPayers(iduser);
      const appPayers: IAppPayer[] = [];
      myPayers.map((payer: IPayer) => {
        appPayers.push(new AppPayer(payer));
      });

      return res.send({ greenmessage: "Your Payers", appPayers });
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
