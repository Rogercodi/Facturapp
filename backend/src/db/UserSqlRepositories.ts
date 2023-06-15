import { API } from "../API";
import { IAppInvoice, IInvoice } from "../app-types/invoice-type";
import { IPayer } from "../app-types/payer-type";
import { UserAppI, sqlUserI } from "../app-types/user-types";
import { IUserSqlRepository } from "../app-types/user-repository-type";
import { AppInvoice } from "../Repositories/AppInvoice";
import { AppPayer } from "../Repositories/AppPayer";
import { IAppPayer } from "../app-types/payer-type";
import { TNewPasswordData, TRecoverData } from "../app-types/recovery-types";
import { InvoiceSQL } from "../Repositories/SqlInvoice";
import { PayerSQL } from "../Repositories/SqlPayer";
import { UserSql } from "../Repositories/UserSql";

async function getSqlData<T, U>(
  query: string,
  values: (string | number)[],
  toAppData: (data: T) => U
): Promise<U[]> {
  let data: T[] = (await API.poolConnection.query(query, values)).rows;
  let dataApp: U[] = data.map(toAppData);
  return dataApp;
}

async function getSqlDataBin(
  query: string,
  values: (string | number)[]
): Promise<number> {
  let number: number = (await API.poolConnection.query(query, values)).rowCount;
  return number;
}

export class UserSqlRepository implements IUserSqlRepository {
  constructor() {}

  // MY INVOICES
  async getMyInvoices(id: number): Promise<IAppInvoice[]> {
    let values = [id];
    let query =
      "SELECT * FROM invoices i LEFT JOIN payers p ON i.idpayer=p.idpayer WHERE i.idusuario = $1 ";
    let toAppData = (invoice: IInvoice) => new AppInvoice(invoice);
    return getSqlData<IInvoice, IAppInvoice>(query, values, toAppData);
  }

  // MY PAYERS
  async getMyPayers(id: number): Promise<IAppPayer[]> {
    let query = "SELECT * FROM payers p WHERE p.idusuario = $1";
    let values = [id];
    let toAppData = (payer: IPayer) => new AppPayer(payer);
    return getSqlData(query, values, toAppData);
  }

  // NEW INVOICE
  async newInvoice(invoice: IAppInvoice): Promise<number> {
    let sqlInvoice: IInvoice = new InvoiceSQL(invoice);

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
    } = sqlInvoice;

    let query =
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

    return getSqlDataBin(query, values);
  }

  // NEW PAYER
  async newPayer(payer: IAppPayer): Promise<number> {
    let sqlPayer: IPayer = new PayerSQL(payer);

    let { nombre, apellidos, email, nif, domicilio, poblacion, cp, idusuario } =
      sqlPayer;

    let query =
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

    return getSqlDataBin(query, values);
  }

  // UPDATE USER
  async updateUser(user: UserAppI): Promise<number> {
    
    let sqlUser = new UserSql(user)
    let {
      nombre,
      apellidos,
      dni,
      numcuenta,
      domicilio,
      poblacion,
      cp,
      idusuario,
    } = sqlUser;

    let query =
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
    
    return getSqlDataBin(query, values)
  }

  // UPDATE PAYER
  public async updatePayer(payer: IAppPayer): Promise<number> {

    let sqlPayer = new PayerSQL(payer)

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
    } = sqlPayer;

    let query =
      "UPDATE payers p SET nombre = $2, apellidos = $3, email = $4, nif = $5, domicilio = $6, poblacion = $7, cp = $8, idusuario = $9 WHERE p.idpayer = $1";
    let values = [
      idpayer as number,
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario,
    ];

    return getSqlDataBin(query, values)
  }

  //UPDATE INVOICE

  public async updateInvoice(invoice: IAppInvoice): Promise<number> {
    let sqlInvoice = new InvoiceSQL(invoice)

    let {
      idinvoice,
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
    } = sqlInvoice
    
    let query =
      "UPDATE invoices i SET numero = $1, base = $2, iva = $3, totalIva = $4, irpf = $5, totalIrpf = $6, body = $7, fecha = $8, total = $9, idpayer = $10, idusuario = $11 WHERE i.idinvoice = $12";
    
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
      idinvoice as number,
    ];

    return getSqlDataBin(query, values)
  }

  //DELETE INVOICE
  public async deleteInvoice(id: number): Promise<number> {
    const query = "DELETE FROM invoices i WHERE i.idinvoice = $1 ";
    const values = [id];
    return getSqlDataBin(query, values)
  }

  //DELETE PAYER
  public async deletePayer(id: number): Promise<number> {
    const query = "DELETE FROM payers p WHERE p.idpayer = $1";
    const values = [id];
    return getSqlDataBin(query, values)
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
  }

  //SET NEW PASSWORD
  public async setNewPassword(data: TNewPasswordData): Promise<number> {
    let { password, email } = data;
    let query = "UPDATE users u SET passwordu = $1 WHERE u.email = $2;";
    let values = [password, email];
    return getSqlDataBin(query, values)
  }
}
