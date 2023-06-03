import { ChangeEvent, ReactNode, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { IAppInvoice } from "../../../backend/src/app-types/invoice-type";
import {IAppPayer} from '../../../backend/src/app-types/payer-type';

interface props {
  children?: ReactNode;
}

export type FacturappContextType = {
  redMessage: string;
  setRedMessage: React.Dispatch<React.SetStateAction<string>>;
  greenMessage: string;
  setGreenMessage: React.Dispatch<React.SetStateAction<string>>;
  iduser: number;
  setIduser: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName:React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  emailapp: string;
  setEmailapp: React.Dispatch<React.SetStateAction<string>>;
  dni: string;
  setDni: React.Dispatch<React.SetStateAction<string>>;
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  cp: string;
  setCp: React.Dispatch<React.SetStateAction<string>>;
  banknumber: string;
  setBanknumber:React.Dispatch<React.SetStateAction<string>>;
  invoices: IAppInvoice[];
  setInvoices: React.Dispatch<React.SetStateAction<IAppInvoice[]>>
  payers: IAppPayer[];
  setPayers: React.Dispatch<React.SetStateAction<IAppPayer[]>>;
  updatePayer: IAppPayer;
  setUpdatePayer: React.Dispatch<React.SetStateAction<IAppPayer | null>>;
};

export const FacturappContext = createContext({});

export function FacturappContextProvider({ children }: props) {
  const [redMessage, setRedMessage] = useState<string>('');
  const [greenMessage, setGreenMessage] = useState<string>('');
  const [iduser, setIduser] = useState<number>();
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [emailapp, setEmailapp] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cp, setCp] = useState<string>('');
  const [banknumber, setBanknumber] = useState<string>("");
  const [invoices, setInvoices] = useState([]);
  const [payers, setPayers] = useState([]);
  const [updatePayer, setUpdatePayer] = useState<IAppPayer | null>();

  return (
    <FacturappContext.Provider
      value={{
        redMessage,
        setRedMessage,
        greenMessage,
        setGreenMessage,
        iduser,
        setIduser,
        name,
        setName,
        surname,
        setSurname,
        emailapp,
        setEmailapp,
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
        setPayers,
        updatePayer,
        setUpdatePayer
      }}
    >
      <Outlet />
      {children}
    </FacturappContext.Provider>
  );
}
