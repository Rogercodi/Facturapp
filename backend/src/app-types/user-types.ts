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