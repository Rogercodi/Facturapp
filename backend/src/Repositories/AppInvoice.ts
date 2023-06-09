import { IAppInvoice, IInvoice } from "../app-types/invoice-type";

export class AppInvoice implements IAppInvoice {
    readonly idinvoice?: number;
    readonly numero: string;
    readonly base: number;
    readonly iva: number
    readonly totaliva: number;
    readonly irpf: number;
    readonly totalirpf: number;
    readonly body: string;
    readonly fecha: string;
    readonly total: number;
    readonly idpayer: number;
    readonly idusuario: number;
    readonly nombre?: string | undefined;
    readonly apellidos?: string | undefined;
    readonly email?: string | undefined;
    readonly nif?: string | undefined;
    readonly domicilio?: string | undefined;
    readonly poblacion?: string | undefined;
    readonly cp?: string | undefined;
    
    
    constructor(invoice: IInvoice) {
      this.idinvoice = invoice.idinvoice;
      this.numero = invoice.numero
      this.base = invoice.base;
      this.iva = invoice.iva;
      this.totaliva = invoice.totaliva;
      this.body = invoice.body;
      this.total = invoice.total;
      this.totalirpf = invoice.totalirpf;
      this.irpf = invoice.irpf;
      this.fecha = invoice.fecha;
      this.idpayer = invoice.idpayer;
      this.idusuario = invoice.idusuario;
      this.nombre = invoice.nombre;
      this.apellidos = invoice.apellidos;
      this.email = invoice.email;
      this.nif = invoice.nif;
      this.domicilio = invoice.domicilio;
      this.poblacion = invoice.poblacion;
      this.cp = invoice.cp;
     
    };

   
  };