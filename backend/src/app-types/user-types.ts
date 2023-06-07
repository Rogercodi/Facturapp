export interface sqlUserI {
    idusuario: number;
    nombre: string;
    apellidos: string;
    email: string;
    dni: string;
    passwordu?: string;
    domicilio: string;
    poblacion: string;
    cp: string;
    numcuenta: string;
    pregunta?: string;
    respuesta?: string;
  }
  
  export interface UserAppI {
    iduser: number;
    name: string;
    surname: string;
    emailapp: string;
    dni: string;
    address: string;
    city: string;
    cp: string;
    banknumber: string;
    question?: string;
    answer?: string;
  }