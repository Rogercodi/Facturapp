import { UserAppI,sqlUserI } from "../app-types/user-types";


export class UserApp implements UserAppI {
  readonly iduser: number;
  readonly name: string;
  readonly surname: string;
  readonly emailapp: string;
  readonly dni: string;
  readonly address: string;
  readonly city: string;
  readonly cp: string;
  readonly banknumber: string;

  constructor(user: sqlUserI) {
    this.iduser = user.idusuario;
    this.name = user.nombre;
    this.surname = user.apellidos;
    this.emailapp = user.email;
    this.dni = user.dni;
    this.address = user.domicilio;
    this.city = user.poblacion;
    this.cp = user.cp;
    this.banknumber = user.numcuenta;
  }

  public async getUser(): Promise<UserAppI> {
    return this;
  }
}
