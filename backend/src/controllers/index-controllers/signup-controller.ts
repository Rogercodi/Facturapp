import { Request, Response, NextFunction } from "express";
import { API } from "../../API";
import bcrypt from "bcrypt";

export class SignUpController {
  constructor() {}

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      let { nombre, apellidos, email, password, confirmPassword } = req.body;

      console.log(req.body);
      if (password !== confirmPassword) {
        return res.send({ redmessage: "Las contraseñas no coinciden" });
       
      }

      if (nombre.length < 1 || apellidos.length < 1 || email.length < 1) {
        return res.send({ redmessage: "Todos los campos son obligatorios" });
        
      }

      let text = "SELECT * FROM users u WHERE u.email = $1";
      let values = [email];
      let userCheck = await API.poolConnection.query(text, values);

      if (userCheck.rowCount > 0) {
        res.send({ redmessage: "El email ya esta registrado" });
      } else {
        let hashed = await bcrypt.hash(password, 10);
        let text =
          "INSERT INTO users (nombre, apellidos, email, passwordu) VALUES ($1, $2, $3, $4)";
        let values = [nombre, apellidos, email, hashed];
        let newUser = await API.poolConnection.query(text, values);
        if (newUser.rowCount === 1) {
          res.send({ greenmessage: "Registrado correctamente!" });
        }
      }
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
