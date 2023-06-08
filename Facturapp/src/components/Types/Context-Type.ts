import { AxiosResponse } from "axios";
import { IAppInvoice } from "../../../../backend/src/app-types/invoice-type";
import { IAppPayer } from "../../../../backend/src/app-types/payer-type";

export type FacturappContextType = {
    redMessage: string;
    setRedMessage: React.Dispatch<React.SetStateAction<string>>;
    greenMessage: string;
    setGreenMessage: React.Dispatch<React.SetStateAction<string>>;
    closeErrorWindow(): void;
    closeErrorWindowTime(): void;
    iduser: number;
    setIduser: React.Dispatch<React.SetStateAction<number>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    surname: string;
    setSurname: React.Dispatch<React.SetStateAction<string>>;
    emailapp: string;
    setEmailapp: React.Dispatch<React.SetStateAction<string>>;
    dni: string;
    setDni: React.Dispatch<React.SetStateAction<string>>;
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    cp: string;
    setCp: React.Dispatch<React.SetStateAction<string>>;
    banknumber: string;
    setBanknumber: React.Dispatch<React.SetStateAction<string>>;
    invoices: IAppInvoice[];
    setInvoices: React.Dispatch<React.SetStateAction<IAppInvoice[]>>;
    payers: IAppPayer[];
    setPayers: React.Dispatch<React.SetStateAction<IAppPayer[]>>;
    updatePayer: IAppPayer;
    setUpdatePayer: React.Dispatch<React.SetStateAction<IAppPayer | null>>;
    axiosCall(
      url: string,
      method: string,
      data: object
    ): Promise<AxiosResponse<any, any>>;
    protectRoute(): void;
  };
  