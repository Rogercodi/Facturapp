import {  ReactNode, createContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { IAppPayer } from "../../../backend/src/app-types/payer-type";
import axios from "axios";

interface props {
  children?: ReactNode;
}


export const FacturappContext = createContext({});

export function FacturappContextProvider({ children }: props) {
  
  //STATES
  const [redMessage, setRedMessage] = useState<string>("");
  const [greenMessage, setGreenMessage] = useState<string>("");
  const [iduser, setIduser] = useState<number>();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [emailapp, setEmailapp] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cp, setCp] = useState<string>("");
  const [banknumber, setBanknumber] = useState<string>("");
  const [invoices, setInvoices] = useState([]);
  const [payers, setPayers] = useState([]);
  const [updatePayer, setUpdatePayer] = useState<IAppPayer | null>();

  const navigate = useNavigate();

  //CLOSE MESSAGES
  const closeErrorWindow = () => {
    setRedMessage("");
    setGreenMessage("");
  };

  //AXIOS
  const axiosCall = async (url: string, method: string, data: object) => {
    return await axios({
      baseURL: "http://localhost:3000",
      method: method,
      data: data,
      withCredentials: true,
      url: url,
    });
  };

  //PROTECT ROUTER
  const protectRoute = () => {
    if (name === "") {
    setRedMessage("Ruta protegida. Inicie sesión");
    navigate('/signin')
  }};

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
        setUpdatePayer,
        closeErrorWindow,
        axiosCall,
        protectRoute
      }}
    >
      <Outlet />
      {children}
    </FacturappContext.Provider>
  );
}
