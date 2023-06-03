import { UserAppI, sqlUserI } from "../app-types/user-types";

export class UserSql implements sqlUserI {
    readonly idusuario: number;
    readonly nombre: string;
    readonly apellidos: string;
    readonly email: string;
    readonly dni: string;
    readonly domicilio: string;
    readonly poblacion: string;
    readonly cp: string;
    readonly numcuenta: string;


    constructor(user: UserAppI){
        this.idusuario = user.iduser;
        this.nombre= user.name;
        this.apellidos = user.surname;
        this.email = user.emailapp;
        this.dni = user.dni;
        this.domicilio = user.address;
        this.poblacion = user.city;
        this.cp = user.cp;
        this.numcuenta = user.banknumber;
    }

};