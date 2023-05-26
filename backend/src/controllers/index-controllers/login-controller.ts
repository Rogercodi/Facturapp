import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../../Repositories/User";
import { UserAppI, sqlUserI } from "../../app-types/user-types";

export class LoginController {
  constructor() {}

  async logIn(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    await passport.authenticate(
      "local",
      async (err: any, user: sqlUserI) => {
        if (err) throw err;
        if (!user) {
          res.status(210).send({ message: "El usuario no existe" });
        } else {
          req.logIn(user, (err) => {
            if (err) throw err;
            console.log('user',user)
            let appUser: UserAppI = new User(user)
            console.log('appuser', appUser)
            res.status(201).send({ message: "Bienvenido!", appUser });
          });
        }
      }
    )(req, res, next);
  }
}
