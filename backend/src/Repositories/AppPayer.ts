import { IPayer } from "../app-types/payer-type";
import { IAppPayer } from "../app-types/payer-type";

export class AppPayer implements IAppPayer {
    readonly idpayer?: number;
    readonly nombre: string;
    readonly apellidos: string;
    readonly email: string;
    readonly nif: string;
    readonly domicilio: string;
    readonly poblacion: string;
    readonly cp: number;
    readonly idusuario: number;

    constructor(payer: IPayer){
        this.idpayer = payer.idpayer;
        this.nombre = payer.nombre;
        this.apellidos = payer.apellidos;
        this.email = payer.email;
        this.nif = payer.nif;
        this.domicilio = payer.domicilio;
        this.poblacion = payer.poblacion;
        this.cp = payer.cp;
        this.idusuario = payer.idusuario
    };
};