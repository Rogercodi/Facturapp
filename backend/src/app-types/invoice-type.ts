export interface IInvoice {
    idinvoice?: number,
    base: number,
    iva: number,
    totaliva: number,
    irpf: number,
    totalirpf: number,
    body: string,
    fecha: string,
    total: number,
    idpayer: number,
    idusuario: number
  }
  

 export interface IAppInvoice {
    idinvoice?: number,
    base: number,
    iva: number,
    totaliva: number,
    irpf: number,
    totalirpf: number,
    body: string,
    fecha: string,
    total: number,
    idpayer: number,
    idusuario: number
  }


  