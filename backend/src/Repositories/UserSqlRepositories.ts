import { API } from "../API";
import { IInvoice } from "../app-types/invoice-type";
import { IPayer } from "../app-types/payer-type";
import { UserAppI, sqlUserI } from "../app-types/user-types";
import { IUserSqlRepository } from "../app-types/user-repository-type";

export class UserSqlRepository implements IUserSqlRepository {
  constructor() {}

  // MY INVOICES
  async getMyInvoices(id: number): Promise<IInvoice[]> {
    let text = "SELECT * FROM invoices i WHERE i.idusuario = $1";
    let values = [id];
    let myInvoices: IInvoice[] = (await API.poolConnection.query(text, values))
      .rows;
    return myInvoices;
  }

  // MY PAYERS
  async getMyPayers(id: number): Promise<IPayer[]> {
    let text = "SELECT * FROM payers p WHERE p.idusuario = $1";
    let values = [id];
    let myPayers: IPayer[] = (await API.poolConnection.query(text, values))
      .rows;
    return myPayers;
  }

  // NEW INVOICE
  async newInvoice(invoice: IInvoice): Promise<number> {
    let {
      base,
      body,
      fecha,
      irpf,
      iva,
      total,
      totalIrpf,
      totalIva,
      idpayer,
      idusuario,
    } = invoice;
    let text =
      "INSERT INTO invoices (base, iva, totalIva, irpf, totalIrpf, body, fecha, total, idpayer, idusuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    let values = [
      base,
      iva,
      totalIva,
      irpf,
      totalIrpf,
      body,
      fecha,
      total,
      idpayer,
      idusuario,
    ];

    let newInvoice: number = (await API.poolConnection.query(text, values))
      .rowCount;
    console.log(newInvoice);

    return newInvoice;
  }

  // NEW PAYER
  async newPayer(payer: IPayer): Promise<number> {
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

    console.log(
      idpayer,
      nombre,
      apellidos,
      email,
      nif,
      domicilio,
      poblacion,
      cp,
      idusuario
    );

    let text =
      "UPDATE payers p SET nombre = $2, apellidos = $3, email = $4, nif = $5, domicilio = $6, poblacion = $7, cp = $8, idusuario = $9 WHERE p.idpayer = $1  ";
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
}
