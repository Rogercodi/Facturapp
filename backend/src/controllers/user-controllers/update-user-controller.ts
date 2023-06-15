import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../db/UserSqlRepositories";
import { IUserSqlRepository } from "../../app-types/user-repository-type";
import { sqlUserI } from "../../app-types/user-types";
import { UserAppI } from "../../app-types/user-types";
import { UserSql } from "../../Repositories/UserSql";

export class UpdateUserController {
  private userRepository: IUserSqlRepository;

  constructor() {
    this.userRepository = new UserSqlRepository();
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      let user: UserAppI = req.body;
     
      let result = await this.userRepository.updateUser(user);
      if (result === 1) {
        res.send({ greenmessage: "Usuario actualizado correctamente", result });
      } else {
        res.send({ redmessage: 'Los datos no son correctos, inténtelo de nuevo'})
      }
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
