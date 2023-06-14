import { IAppPayer, IPayer } from "./payer-type";
import { sqlUserI } from "./user-types";
import { IAppInvoice, IInvoice } from "./invoice-type";
import { AppPayer } from "../Repositories/AppPayer";
import { TNewPasswordData, TRecoverData } from "./recovery-types";


export interface IUserSqlRepository {
    getMyInvoices(id: number): Promise<IAppInvoice[]>;
    getMyPayers(id: number): Promise<IAppPayer[]>;
    newInvoice(invoice: IInvoice): Promise<number>;
    newPayer(payer: IPayer): Promise<number>;
    updateUser(user: sqlUserI): Promise<number>;
    updatePayer(payer: IPayer): Promise<number>;
    updateInvoice(invoice: IAppInvoice): Promise<number>;
    deleteInvoice(id: number): Promise<number>;
    deletePayer(id: number): Promise<number>;
    recoverUser(email: string): Promise<TRecoverData[] | 0>;
    setNewPassword(data: TNewPasswordData): Promise<number>;
  }