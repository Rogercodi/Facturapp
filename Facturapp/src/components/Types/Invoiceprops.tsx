import { IAppPayer } from "../../../../backend/src/app-types/payer-type";
import { UserAppI } from "../../../../backend/src/app-types/user-types";

export type Invoiceprops = {
    base: number;
    iva: number;
    irpf: number;
    body: string;
    fecha: string;
    totaliva: number;
    totalirpf: number;
    total: number;
    user: UserAppI;
    payerdata?: IAppPayer;
    pnombre: string;
    papellidos: string;
    pemail: string;
    pnif: string;
    pdomicilio: string;
    ppoblacion: string;
    pcp: string;
  }