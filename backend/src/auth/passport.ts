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
              console.log("error");
              throw err;
            }

            if (isMatch) {
              console.log("ismatch");
              return done(null, user);
            } else {
              console.log("else");
              return done(null, false, { message: "Password is not correct" });
            }
          });
        } else {
          return done(null, false, { message: "Email is not registered" });
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

  passport.serializeUser((user: any, done) => {
    console.log("serialize"), done(null, user.idusuario);
  });

  passport.deserializeUser( (id, done) => {
    API.poolConnection.query(
      "SELECT * FROM users WHERE id = $1",
      [id],
      (err, results) => {
        if (err) {
          throw err;
        }
        return done(null, results.rows[0]);
      }
    );
  });
};
