import { Request, Response, NextFunction } from "express";
import { API } from "../../API";
import bcrypt from "bcrypt";

export class SignUpController {
  constructor() {}

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        nombre,
        apellidos,
        email,
        password,
        confirmPassword,
        pregunta,
        respuesta,
      } = req.body;

      if (
        nombre.length < 1 ||
        apellidos.length < 1 ||
        email.length < 1 ||
        password.length < 1 ||
        pregunta.length < 1 ||
        respuesta.length < 1
      ) {
        return res.send({ redmessage: "Todos los campos son obligatorios" });
      }

      if (password !== confirmPassword) {
        return res.send({ redmessage: "Las contraseñas no coinciden" });
      }

      let text = "SELECT * FROM users u WHERE u.email = $1";
      let values = [email];
      let userCheck = await API.poolConnection.query(text, values);

      if (userCheck.rowCount > 0) {
        return res.send({ redmessage: "El email ya esta registrado" });
      } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        let hashedAnswer = await bcrypt.hash(respuesta, 10);
        let text =
          "INSERT INTO users (nombre, apellidos, email, passwordu, pregunta, respuesta) VALUES ($1, $2, $3, $4, $5, $6)";
        let values = [
          nombre,
          apellidos,
          email,
          hashedPassword,
          pregunta,
          hashedAnswer,
        ];
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
