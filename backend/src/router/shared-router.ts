import express  from "express";
import { LogoutController } from "../controllers/index-controllers/logout-controller";
import { SignUpController } from "../controllers/index-controllers/signup-controller";
import { LoginController } from "../controllers/index-controllers/login-controller";

//-------------------------------------------------- END IMPORTS -------------------------------------------------------------//

const Router = express.Router();

//LOGIN
const logInController = new LoginController();
Router.post("/signin", logInController.logIn.bind(logInController));

//REGISTER
const signUpController = new SignUpController();
Router.post('/signup', signUpController.signUp.bind(signUpController));

//LOGOUT
const logOutController = new LogoutController();
Router.get('/logout', logOutController.logOut.bind(logOutController));

export default Router;