import { NextFunction, Request, Response } from "express";
import { UserSqlRepository } from "../../Repositories/UserSqlRepositories";
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
      let toUpdateUser = new UserSql(user)
      console.log('appuser', user)
      console.log("updateuser", toUpdateUser);
      let result = await this.userRepository.updateUser(toUpdateUser);
      if (result === 1) {
        res.send({ message: "User successfully updated", result });
      } else {
        res.send({ message: 'Update failed, try again', result})
      }
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
