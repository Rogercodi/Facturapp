export interface IInvoice {
    idinvoice?: number,
    numero: string,
    base: number,
    iva: number,
    totaliva: number,
    irpf: number,
    totalirpf: number,
    body: string,
    fecha: string,
    total: number,
    idpayer: number,
    idusuario: number,
    nombre?: string,
    apellidos?: string,
    email?: string,
    nif?: string,
    domicilio?: string,
    poblacion?: string,
    cp?: string
  }
  

 export interface IAppInvoice {
    idinvoice?: number,
    numero: string
    base: number,
    iva: number,
    totaliva: number,
    irpf: number,
    totalirpf: number,
    body: string,
    fecha: string,
    total: number,
    idpayer: number,
    idusuario: number,
    nombre?: string,
    apellidos?: string,
    email?: string,
    nif?: string,
    domicilio?: string,
    poblacion?: string,
    cp?: string,
    setFecha?(): any;
  }


  