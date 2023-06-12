import { IInvoice, IAppInvoice } from "../app-types/invoice-type";

export class InvoiceSQL implements IInvoice {
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
    
    
    constructor(invoice: IAppInvoice) {
      this.idinvoice = invoice.idinvoice;
      this.numero = invoice.numero;
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