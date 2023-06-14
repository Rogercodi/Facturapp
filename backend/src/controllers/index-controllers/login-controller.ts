import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserApp } from "../../Repositories/UserApp";
import { UserAppI, sqlUserI } from "../../app-types/user-types";
import { emailjsConfig } from "../../config/Config-types";
import { Configuration } from "../../config/GetConfigClass";

export class LoginController {
  constructor() {}

  async logIn(req: Request, res: Response, next: NextFunction) {
    
    await passport.authenticate(
      "local",
      async (err: any, user: sqlUserI) => {
        if (err) throw err;
        if (!user) {
          return res.send({ redmessage: "El usuario no existe o la contraseña no es correcta" });
        } else {
          req.logIn(user, (err) => {
            if (err) throw err;
            let appUser: UserAppI = new UserApp(user);
            let emailconfig: emailjsConfig = new Configuration().getConfigurations().emailjs;
            console.log(emailconfig)
            return res.send({ greenmessage: "Bienvenido!", appUser, emailconfig });
          });
        }
      }
      
    )
    
    (req, res, next);
  }
}
