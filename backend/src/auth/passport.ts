import { Strategy as LocalStrategy } from "passport-local";
import { API } from "../API";
import bcrypt from "bcrypt";
import { PassportStatic } from "passport";

export const loginPassport = function initialize(passport: PassportStatic) {
  const authenticateUser = (
    email: string,
    password: string,
    done: Function
  ) => {
    API.poolConnection.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.passwordu, (err, isMatch) => {
            if (err) {
              throw err;
            }

            if (isMatch) {
              return done(null, user);
            }

            if (!isMatch) {
              return done(null, false, {
                redmessage:
                  "Contraseña incorrecta. Por favor, intente de nuevo",
              });
            }
          });
        } else {
          return done(null, false, { redmessage: "Email no registrado" });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user: any , done) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
   
    API.poolConnection.query(
      "SELECT * FROM users u WHERE u.idusuario = $1",
      [user.idusuario],
      (err, results) => {
        if (err) {
          throw err;
        }
        
        return done(null, results.rows[0]);
      }
    );
  });
};
