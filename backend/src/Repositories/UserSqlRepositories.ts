import { API } from "../API";
import { IAppInvoice, IInvoice } from "../app-types/invoice-type";
import { IPayer } from "../app-types/payer-type";
import { UserAppI, sqlUserI } from "../app-types/user-types";
import { IUserSqlRepository } from "../app-types/user-repository-type";
import { AppInvoice } from "./AppInvoice";
import { AppPayer } from "./AppPayer";
import { IAppPayer } from "../app-types/payer-type";
import { TNewPasswordData, TRecoverData } from "../app-types/recovery-types";

export class UserSqlRepository implements IUserSqlRepository {
  constructor() {}

  // MY INVOICES
  async getMyInvoices(id: number): Promise<IAppInvoice[]> {
    let text =
      "SELECT * FROM invoices i LEFT JOIN payers p ON i.idpayer=p.idpayer WHERE i.idusuario = $1 ";
    let values = [id];
    let myInvoices: IInvoice[] = (await API.poolConnection.query(text, values))
      .rows;
    let myAppInvoices: IAppInvoice[] = [];
    myInvoices.forEach((invoice: IInvoice) => {
     
      myAppInvoices.push(new AppInvoice(invoice));
    });
    return myAppInvoices;
  }

  // MY PAYERS
  async getMyPayers(id: number): Promise<IAppPayer[]> {
    let text = "SELECT * FROM payers p WHERE p.idusuario = $1";
    let values = [id];
    let myPayers: IPayer[] = (await API.poolConnection.query(text, values))
      .rows;
    let myAppPayers: IAppPayer[] = [];
    myPayers.forEach((payer: IPayer) => {
      myAppPayers.push(new AppPayer(payer));
    });

    return myAppPayers;
  }

  // NEW INVOICE
  async newInvoice(invoice: IAppInvoice): Promise<number> {
    let {
      numero,
      base,
      body,
      fecha,
      irpf,
      iva,
      total,
      totalirpf,
      totaliva,
      idpayer,
      idusuario,
    } = invoice;
    let text =
      "INSERT INTO invoices (numero, base, iva, totalIva, irpf, totalIrpf, body, fecha, total, idpayer, idusuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    let values = [
      numero,
      base,
      iva,
      totaliva,
      irpf,
      totalirpf,
      body,
      fecha,
      total,
      idpayer,
      idusuario,
    ];

    let newInvoice: number = (await API.poolConnection.query(text, values))
      .rowCount;

    return newInvoice;
  }

  // NEW PAYER
  async newPayer(payer: IAppPayer): Promise<number> {
    let { nombre, apellidos, email, nif, domicilio, poblacion, cp, idusuario } =
      payer;
    let text =
      "INSERT INTO payers (nombre, apellidos, email, nif, domicilio, poblacion, cp, idusuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    let values = [
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario,
    ];
    let newPayer: number = (await API.poolConnection.query(text, values))
      .rowCount;
    return newPayer;
  }

  // UPDATE USER
  async updateUser(user: sqlUserI): Promise<number> {
    let {
      nombre,
      apellidos,
      dni,
      numcuenta,
      domicilio,
      poblacion,
      cp,
      idusuario,
    } = user;
    let text =
      "UPDATE users SET nombre = $1, apellidos = $2, dni = $3, numcuenta = $4, domicilio = $5, poblacion = $6, cp = $7 WHERE users.idusuario = $8";
    let values = [
      nombre,
      apellidos,
      dni,
      numcuenta,
      domicilio,
      poblacion,
      cp,
      idusuario,
    ];
    let result: number = (await API.poolConnection.query(text, values))
      .rowCount;
    return result;
  }

  // UPDATE PAYER
  public async updatePayer(payer: IPayer): Promise<number> {
    let {
      idpayer,
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario,
    } = payer;

    let text =
      "UPDATE payers p SET nombre = $2, apellidos = $3, email = $4, nif = $5, domicilio = $6, poblacion = $7, cp = $8, idusuario = $9 WHERE p.idpayer = $1";
    let values = [
      idpayer,
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario,
    ];

    let result = (await API.poolConnection.query(text, values)).rowCount;
    return result;
  }

  //DELETE INVOICE
  public async deleteInvoice(id: number): Promise<number> {
    const text = "DELETE FROM invoices i WHERE i.idinvoice = $1 ";
    const values = [id];
    let result = (await API.poolConnection.query(text, values)).rowCount;
    return result;
  }

  //DELETE PAYER
  public async deletePayer(id: number): Promise<number> {
    const text = "DELETE FROM payers p WHERE p.idpayer = $1";
    const values = [id];
    let result = (await API.poolConnection.query(text, values)).rowCount;
    return result;
  }

  //RECOVER USER
  public async recoverUser(email: string): Promise<TRecoverData[] | 0> {
    let text =
      "SELECT email, pregunta, respuesta FROM users u WHERE u.email = $1";
    let values = [email];
    let result = await API.poolConnection.query(text, values);
    if (result.rowCount === 0) {
      return 0;
    } else {
      return result.rows;
    }
  };

  //SET NEW PASSWORD
  public async setNewPassword(data: TNewPasswordData): Promise<number> {
    let {password, email} = data;
    let text = 'UPDATE users u SET passwordu = $1 WHERE u.email = $2;'
    let values = [password, email];
    let result:number = (await API.poolConnection.query(text, values)).rowCount;
    return result
  }
}





