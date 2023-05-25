import { Request, Response, NextFunction } from "express";
import { API } from "../../API";
import bcrypt from "bcrypt";

export class SignUpController {
  constructor() {}

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      let { nombre, apellidos, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        res.send({ message: "Las contraseñas no coinciden" });
      }

      let text = "SELECT * FROM users u WHERE u.email = $1";
      let values = [email];
      let userCheck = await API.poolConnection.query(text, values);

      if (userCheck.rowCount > 0) {
        res.send({ message: "El email ya esta registrado" });
      } else {
        let hashed = await bcrypt.hash(password, 10);
        let text =
          "INSERT INTO users (nombre, apellidos, email, passwordu) VALUES ($1, $2, $3, $4)";
        let values = [nombre, apellidos, email, hashed];
        let newUser = await API.poolConnection.query(text, values);
        if (newUser.rowCount === 1) {
          res.send({ message: "Registrado correctamente!" });
        }
      }
    } catch (error) {
      console.log(error);
      next();
    }
  }
}
