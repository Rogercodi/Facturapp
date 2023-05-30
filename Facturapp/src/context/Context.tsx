import { ChangeEvent, ReactNode, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { IAppInvoice } from "../../../backend/src/app-types/invoice-type";
import {IAppPayer} from '../../../backend/src/app-types/payer-type';

interface props {
  children?: ReactNode;
}

export type FacturappContextType = {
  iduser: number,
  setIduser(data: number): void;
  name: string;
  setName:ChangeEvent<HTMLInputElement>;
  surname: string;
  setSurname: ChangeEvent<HTMLInputElement>;
  emailApp: string;
  setEmailApp: ChangeEvent<HTMLInputElement>;
  dni: string;
  setDni: ChangeEvent<HTMLInputElement>;
  address: string,
  setAddress: ChangeEvent<HTMLInputElement>;
  city: string;
  setCity: ChangeEvent<HTMLInputElement>;
  cp: string;
  setCp: ChangeEvent<HTMLInputElement>;
  banknumber: string;
  setBanknumber:ChangeEvent<HTMLInputElement>;
  invoices: IAppInvoice[];
  setInvoices(data: any): void;
  payers: IAppPayer[];
  setPayers(data: any): void;
};

export const FacturappContext = createContext({});

export function FacturappContextProvider({ children }: props) {
  const [iduser, setIduser] = useState<number>();
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [emailApp, setEmailApp] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cp, setCp] = useState<number>();
  const [banknumber, setBanknumber] = useState<string>("");
  const [invoices, setInvoices] = useState([]);
  const [payers, setPayers] = useState([]);

  return (
    <FacturappContext.Provider
      value={{
        iduser,
        setIduser,
        name,
        setName,
        surname,
        setSurname,
        emailApp,
        setEmailApp,
        dni,
        setDni,
        address,
        setAddress,
        city,
        setCity,
        cp,
        setCp,
        banknumber,
        setBanknumber,
        invoices,
        setInvoices,
        payers,
        setPayers
      }}
    >
      <Outlet />
      {children}
    </FacturappContext.Provider>
  );
}
