import { IPayer } from "./payer-type";
import { sqlUserI } from "./user-types";
import { IInvoice } from "./invoice-type";


export interface IUserSqlRepository {
    getMyInvoices(id: number): Promise<IInvoice[]>;
    getMyPayers(id: number): Promise<IPayer[]>;
    newInvoice(invoice: IInvoice): Promise<number>;
    newPayer(payer: IPayer): Promise<number>;
    updateUser(user: sqlUserI): Promise<number>;
    updatePayer(payer: IPayer): Promise<number>;
  }