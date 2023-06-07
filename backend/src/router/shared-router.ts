import express  from "express";
import { LogoutController } from "../controllers/index-controllers/logout-controller";
import { SignUpController } from "../controllers/index-controllers/signup-controller";
import { LoginController } from "../controllers/index-controllers/login-controller";
import { RecoverUserController } from "../controllers/user-controllers/recover-user-controller";
import { NewPasswordUserController } from "../controllers/user-controllers/confirm-recover-user-controller";

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
Router.get('/user/logout', logOutController.logOut.bind(logOutController));

//RECOVER USER
const recoverUserController = new RecoverUserController();
Router.post('/recover', recoverUserController.recoverUser.bind(recoverUserController));

//SET NEW PASSWORD USER
const setNewPasswordController = new NewPasswordUserController();
Router.post('/setnewpassword', setNewPasswordController.newPassword.bind(setNewPasswordController))


export default Router;