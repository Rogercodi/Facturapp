export interface sqlUserI {
  idusuario: number;
  nombre: string;
  apellidos: string;
  email: string;
  dni: string;
  domicilio: string;
  poblacion: string;
  cp: number;
  numcuenta: string;
}

export interface UserAppI {
  iduser: number;
  name: string;
  surname: string;
  email: string;
  dni: string;
  address: string;
  city: string;
  cp: number;
  banknumber: string;
}

export class User implements UserAppI {
  readonly iduser: number;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly dni: string;
  readonly address: string;
  readonly city: string;
  readonly cp: number;
  readonly banknumber: string;

  constructor(user: sqlUserI) {
    this.iduser = user.idusuario;
    this.name = user.nombre;
    this.surname = user.apellidos;
    this.email = user.email;
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
