import { IAppInvoice, IInvoice } from "../app-types/invoice-type";

export class AppInvoice implements IAppInvoice {
    readonly idinvoice?: number;
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
    
    
    constructor(invoice: IInvoice) {
      this.idinvoice = invoice.idinvoice
      this.base = invoice.base;
      this.iva = invoice.iva;
      this.totaliva = invoice.totaliva;
      this.body = invoice.body;
      this.total = invoice.total;
      this.totalirpf = invoice.totalirpf;
      
      this.irpf = invoice.irpf;
      this.fecha = invoice.fecha;
      this.idpayer = invoice.idpayer;
      this.idusuario = invoice.idusuario
    };
  };